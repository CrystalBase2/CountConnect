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
import { collection, query, doc, onSnapshot, addDoc, deleteDoc, updateDoc, getDocs, getDoc, where } from 'firebase/firestore';
import { ref, onValue, off } from 'firebase/database';


const UserContext = createContext();


export const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState({});
   const [drivers, setDrivers] = useState([]);
   const [busInfo, setBus] = useState([]);
   const [personCount, setPersonCount] = useState(0);
   const [numPeople, setNumPeople] = useState(0);
   const [dailyReport, setDailyReport] = useState({
      totalPeopleInsideMorning: 0,
      totalPeopleInsideAfternoon: 0,
      totalPeopleInsideEvening: 0,
   });

   const [weeklyReport, setWeeklyReport] = useState({
      Monday: { date: '', totalPeopleInside: '00' },
      Tuesday: { date: '', totalPeopleInside: '00' },
      Wednesday: { date: '', totalPeopleInside: '00' },
      Thursday: { date: '', totalPeopleInside: '00' },
      Friday: { date: '', totalPeopleInside: '00' },
      Saturday: { date: '', totalPeopleInside: '00' },
      Sunday: { date: '', totalPeopleInside: '00' },
   });
   const [monthlyReport, setMonthlyReport] = useState({
      week1: 0,
      week2: 0,
      week3: 0,
      week4: 0,
      week5: 0
   });
   const [busRoutes, setBusRoutes] = useState([]);
   const [raspberryPiOptions, setRaspberryPiOptions] = useState([]);

   useEffect(() => {
      const fetchRaspberryPiOptions = () => {
         const raspberryPiRef = ref(database, '/raspberrypi');

         const raspberryPiOptionsListener = onValue(raspberryPiRef, (snapshot) => {
            const options = snapshot.val();
            setRaspberryPiOptions(options ? Object.keys(options) : []);
         });

         return () => {
            off(raspberryPiRef, 'value', raspberryPiOptionsListener);
         };
      };

      fetchRaspberryPiOptions();

      return () => {
         // Cleanup function to detach the listener when the component unmounts
      };
   }, []);

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


   const generateDailyReport = async () => {
      try {
         const currentDate = new Date();
         const startOfDay = new Date(currentDate);
         startOfDay.setHours(0, 0, 0, 0); // Set to midnight

         const endOfDay = new Date(currentDate);
         endOfDay.setHours(23, 59, 59, 999); // Set to the last millisecond of the day

         const querySnapshot = await getDocs(
            collection(db, 'total_people'),
            where('date', '>=', startOfDay.toISOString().slice(0, 10)),
            where('date', '<=', endOfDay.toISOString().slice(0, 10))
         );

         let dailyReportData = {
            date: currentDate.toLocaleDateString(),
            totalPeopleInsideMorning: 0,
            totalPeopleInsideAfternoon: 0,
            totalPeopleInsideEvening: 0,
            raspberryPiID: "" // Initialize raspberryPiID to empty string
         };

         let dataFound = false;

         querySnapshot.forEach((doc) => {
            const docDate = new Date(doc.data().date);
            const totalPeopleInsideMorning = doc.data().total_people_inside_morning || 0;
            const totalPeopleInsideAfternoon = doc.data().total_people_inside_afternoon || 0;
            const totalPeopleInsideEvening = doc.data().total_people_inside_evening || 0;
            const raspberryPiID = doc.data().raspberryPiID; // Assuming raspberryPiID is stored in the document

            if (docDate >= startOfDay && docDate <= endOfDay) {
               dataFound = true;
               dailyReportData = {
                  date: docDate.toLocaleDateString(),
                  totalPeopleInsideMorning,
                  totalPeopleInsideAfternoon,
                  totalPeopleInsideEvening,
                  raspberryPiID
               };
            }
         });

         if (!dataFound) {
            console.log('No data found for today. Setting values to 0.');
         }

         setDailyReport(dailyReportData);
      } catch (error) {
         console.error('Error generating daily report: ', error);
      }
   };

   useEffect(() => {
      generateDailyReport();
   }, []);



   const generateWeeklyReport = async () => {
      try {
         const currentDate = new Date();
         const startOfWeek = new Date(currentDate);
         startOfWeek.setHours(0, 0, 0, 0); // Set to midnight
         startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start from the beginning of the week

         const endOfWeek = new Date(startOfWeek);
         endOfWeek.setDate(endOfWeek.getDate() + 7); // End at the end of the week

         const querySnapshot = await getDocs(
            collection(db, 'total_people'),
            where('date', '>=', startOfWeek.toISOString().slice(0, 10)),
            where('date', '<=', endOfWeek.toISOString().slice(0, 10))
         );

         const weeklyReportData = {
            Sunday: { date: '', totalPeopleInside: '00', raspberryPiID: '' },
            Monday: { date: '', totalPeopleInside: '00', raspberryPiID: '' },
            Tuesday: { date: '', totalPeopleInside: '00', raspberryPiID: '' },
            Wednesday: { date: '', totalPeopleInside: '00', raspberryPiID: '' },
            Thursday: { date: '', totalPeopleInside: '00', raspberryPiID: '' },
            Friday: { date: '', totalPeopleInside: '00', raspberryPiID: '' },
            Saturday: { date: '', totalPeopleInside: '00', raspberryPiID: '' },
         };

         querySnapshot.forEach((doc) => {
            const dateString = doc.data().date;
            const date = new Date(dateString);

            // Check if the date is within the current week
            if (date >= startOfWeek && date <= endOfWeek) {
               const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];

               weeklyReportData[dayName] = {
                  date: date.toLocaleDateString(),
                  totalPeopleInside: doc.data().total_people_inside,
                  raspberryPiID: doc.data().raspberryPiID // Include raspberryPiID in the weekly report data
               };
            }
         });

         setWeeklyReport(weeklyReportData);
      } catch (error) {
         console.error('Error generating weekly report: ', error);
      }
   };

   useEffect(() => {
      generateWeeklyReport();
   }, []);



   const generateMonthlyReport = async () => {
      try {
         const currentDate = new Date();
         const currentYear = currentDate.getFullYear();
         const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed

         const startDate = new Date(currentYear, currentMonth - 1, 1);
         const endDate = new Date(currentYear, currentMonth, 0); // Last day of the month

         const querySnapshot = await getDocs(
            query(collection(db, 'total_people'),
               where('date', '>=', startDate.toISOString().slice(0, 10)),
               where('date', '<=', endDate.toISOString().slice(0, 10))
            )
         );

         const monthlyReportData = {
            week1: { totalPeopleInside: 0, raspberryPiID: '' },
            week2: { totalPeopleInside: 0, raspberryPiID: '' },
            week3: { totalPeopleInside: 0, raspberryPiID: '' },
            week4: { totalPeopleInside: 0, raspberryPiID: '' },
            week5: { totalPeopleInside: 0, raspberryPiID: '' }
         };

         querySnapshot.forEach((doc) => {
            const dateString = doc.data().date;
            const date = new Date(dateString);

            // Ensure that the date is within the specified range
            if (date >= startDate && date <= endDate) {
               const weekOfMonth = Math.ceil((date.getDate() + startDate.getDay()) / 7);

               // Assuming each document has a 'total_people_inside' and 'raspberryPiID' field
               const totalPeopleInside = doc.data().total_people_inside;
               const raspberryPiID = doc.data().raspberryPiID;

               // Add to the respective week
               monthlyReportData[`week${weekOfMonth}`] = {
                  totalPeopleInside: monthlyReportData[`week${weekOfMonth}`].totalPeopleInside + totalPeopleInside,
                  raspberryPiID: raspberryPiID
               };
            }
         });

         setMonthlyReport(monthlyReportData); // Set the state with the fetched data

         return monthlyReportData;
      } catch (error) {
         console.error('Error generating monthly report: ', error);
      }
   };

   useEffect(() => {
      generateMonthlyReport();
   }, []); // Run initially and whenever the component mounts


   const addBusRoute = async (route) => {
      try {
         const routesRef = collection(db, 'busRoutes');
         await addDoc(routesRef, {
            route,
         });
         console.log('Bus route added successfully');
      } catch (error) {
         console.error('Error adding bus route:', error.message);
      }
   };
   const fetchBusRoutes = async () => {
      try {
         const querySnapshot = await getDocs(collection(db, 'busRoutes'));
         const routesData = querySnapshot.docs.map(doc => doc.data().route);
         setBusRoutes(routesData);
      } catch (error) {
         console.error('Error fetching bus routes:', error.message);
      }
   };

   useEffect(() => {
      fetchBusRoutes();
   }, []);

   const addBusInfo = async (busRoute, busNumber, busCapacity, raspberryPi) => {
      try {
         const busInfoRef = collection(db, 'busInfo');
         await addDoc(busInfoRef, {
            busRoute,
            busNumber,
            busCapacity,
            raspberryPi
         });
         console.log('Bus info added successfully');
      } catch (error) {
         console.error('Error adding bus info:', error.message);
      }
   };

   const updateBusInfo = async (id, newData) => {
      try {
         await updateDoc(doc(db, 'busInfo', id), newData);
      } catch (error) {
         console.error('Error updating bus info:', error.message);
      }
   };

   const deleteBusInfo = async (id) => {
      try {
         await deleteDoc(doc(db, 'busInfo', id));
      } catch (error) {
         console.error('Error deleting bus info:', error.message);
      }
   };

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

            // Fetch busInfo data from Firestore.
            const busInfoRef = collection(db, 'busInfo');
            const unsubscribeBusInfoSnapshot = onSnapshot(busInfoRef, (querySnapshot) => {
               const busInfoData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
               setBus(busInfoData);
            });

            // Clean up the snapshot listeners when the component unmounts.
            return () => {
               unsubscribeSnapshot();
               unsubscribeDriversSnapshot();
               unsubscribeBusInfoSnapshot();
            };

         }
      });

      return () => {
         unsubscribe();
      };
   }, []);

   return (
      <UserContext.Provider value={{
         createUser,
         user,
         logout,
         signIn,
         forgotPass,
         reloadUser,
         drivers,
         addBusDriver,
         deleteDriver,
         updateDriver,
         personCount,
         numPeople,
         dailyReport,
         weeklyReport,
         monthlyReport,
         busRoutes,
         fetchBusRoutes,
         addBusRoute,
         raspberryPiOptions,
         addBusInfo,
         busInfo,
         updateBusInfo,
         deleteBusInfo
      }}>
         {children}
      </UserContext.Provider>
   );
};

export const UserAuth = () => {
   return useContext(UserContext);
};