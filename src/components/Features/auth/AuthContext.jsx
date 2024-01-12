import { createContext, useContext, useEffect, useState } from 'react';
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   sendPasswordResetEmail,
   signOut,
   onAuthStateChanged,
   sendEmailVerification,
   reload,
} from 'firebase/auth';
import { auth, db, database } from '../../../firebase';
import { collection, doc, onSnapshot, addDoc, deleteDoc, updateDoc, getDocs, where} from 'firebase/firestore';
import { ref, onValue, off } from 'firebase/database';


const UserContext = createContext();


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [drivers, setDrivers] = useState([]);
    const [personCount, setPersonCount] = useState(0);
    const [numPeople, setNumPeople] = useState(0);
    const [totalPeopleData, setTotalPeopleData] = useState({
    morning: "00",
    afternoon: "00",
    evening: "00"
  });

  useEffect(() => {
    const fetchPersonCount = () => {
      const personCountRef = ref(database, '/person_count');

      const personCountListener = onValue(personCountRef, (snapshot) => {
        const count = snapshot.val();
        setPersonCount(count);
      });

      return () => {
        off(personCountRef, 'value', personCountListener);
      };
    };

    fetchPersonCount();

    return () => {
      // Cleanup function to detach the listener when the component unmounts
    };
  }, []);

  useEffect(() => {
   const fetchNumPeople = () => {
      const numPeopleRef = ref(database, '/num_people');

      const numPeopleListener = onValue(numPeopleRef, (snapshot) => {
         const count = snapshot.val();
         setNumPeople(count);
      });

      return () => {
         off(numPeopleRef, 'value', numPeopleListener);
      };
   };

   fetchNumPeople();

   return () => {
      // Cleanup function to detach the listener when the component unmounts
   };
   }, []);


  const fetchTotalPeopleData = async () => {
    try {
      const todaysDate = new Date().toISOString().slice(0, 10);
      const totalPeopleRef = collection(db, 'total_people');
      const querySnapshot = await getDocs(totalPeopleRef, where('date', '==', todaysDate));

      // Assuming there is only one document for today's date
      if (querySnapshot.docs.length > 0) {
        const { total_people_inside_morning, total_people_inside_afternoon, total_people_inside_evening } = querySnapshot.docs[0].data();

        setTotalPeopleData({
          morning: total_people_inside_morning,
          afternoon: total_people_inside_afternoon,
          evening: total_people_inside_evening
        });
      } else {
        console.log('No data found for today');
      }
    } catch (error) {
      console.error('Error fetching total people data:', error);
    }
  };

  useEffect(() => {
    fetchTotalPeopleData();
  }, []); // Fetch data when the component mounts



 
    const createUser = async (email, password) => {
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
       sendEmailVerification(userCredential.user);
       return userCredential;
    };
 
    const signIn = async (email, password) => {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       return userCredential;
    };
 
    const forgotPass = (email) => {
       return sendPasswordResetEmail(auth, email);
    };
 
    const logout = async () => {
       try {
          await signOut(auth);
          console.log("Success logout");
       } catch (error) {
          console.log(error);
       }
    };
 
    const reloadUser = async () => {
       try {
          await reload(auth.currentUser);
          setUser(auth.currentUser);
       } catch (error) {
          console.error('Error reloading user:', error.message);
       }
    };
 
    const addBusDriver = async (busRoute, busNumber, idNumber, driverName, contactNumber) => {
       try {
          const driversRef = collection(db, 'busDrivers');
          await addDoc(driversRef, {
             busRoute,
             busNumber,
             idNumber,
             driverName,
             contactNumber,
          });
          console.log('Bus driver added successfully');
       } catch (error) {
          console.error('Error adding bus driver:', error.message);
       }
    };

    const deleteDriver = async (id) => {
    try {
      await deleteDoc(doc(db, 'busDrivers', id));
      setDrivers(drivers.filter((driver) => driver.id !== id)); // Update local state
    } catch (error) {
      console.error("Error deleting driver:", error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

   const updateDriver = async (id, newData) => {
      try {
         await updateDoc(doc(db, 'busDrivers', id), newData);
      } catch (error) {
         console.error("Error updating driver:", error);
         // Handle error appropriately, e.g., display an error message to the user
      }
   };
 
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
 
          if (currentUser) {
             // Fetch additional user data from Firestore.
             const userRef = doc(collection(db, 'users'), currentUser.uid);
 
             // Listen for real-time updates.
             const unsubscribeSnapshot = onSnapshot(userRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                   const userData = docSnapshot.data();
                   setUser((prevUser) => ({ ...prevUser, ...userData }));
                } else {
                   console.log('No such document!');
                }
             });
 
             // Fetch drivers data from Firestore.
             const driversRef = collection(db, 'busDrivers');
             const unsubscribeDriversSnapshot = onSnapshot(driversRef, (querySnapshot) => {
                const driversData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDrivers(driversData);
             });
 
             // Clean up the snapshot listeners when the component unmounts.
             return () => {
                unsubscribeSnapshot();
                unsubscribeDriversSnapshot();
             };
          }
       });
 
       return () => {
          unsubscribe();
       };
    }, []);
 
    return (
       <UserContext.Provider value={{ createUser, user, logout, signIn, forgotPass, reloadUser, drivers, addBusDriver, deleteDriver, updateDriver, personCount, numPeople, totalPeopleData }}>
          {children}
       </UserContext.Provider>
    );
 };

export const UserAuth = () => {
    return useContext(UserContext);
};