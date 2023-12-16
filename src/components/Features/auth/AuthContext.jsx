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
import { collection, doc, getDoc} from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

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
        return sendPasswordResetEmail(auth, email)
    }

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("success logout")
        } catch (error) {
            console.log(error);
        }
    }

    const reloadUser = async () => {
        try {
            await reload(auth.currentUser);
            setUser(auth.currentUser);
        } catch (error) {
            console.error('Error reloading user:', error.message);
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
     
            if (currentUser) {
                // Fetch additional user data from Firestore.
                const userRef = doc(collection(db, 'users'), currentUser.uid);
     
                try {
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                       const userData = userDoc.data();
                       setUser((prevUser) => ({ ...prevUser, ...userData }));
                    } else {
                       console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            }
        });
     
        return () => {
            unsubscribe();
        };
     }, []);
     

    
    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn, forgotPass, reloadUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};