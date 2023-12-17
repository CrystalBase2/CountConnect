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
import { auth, db } from '../../../firebase';
import { collection, doc, onSnapshot,addDoc } from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [drivers, setDrivers] = useState([]);
 
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
       <UserContext.Provider value={{ createUser, user, logout, signIn, forgotPass, reloadUser, drivers, addBusDriver }}>
          {children}
       </UserContext.Provider>
    );
 };

export const UserAuth = () => {
    return useContext(UserContext);
};