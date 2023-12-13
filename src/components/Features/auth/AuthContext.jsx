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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
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