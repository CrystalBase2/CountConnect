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
import { auth } from '../../../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const createUser = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        sendEmailVerification(userCredential.user);
        return userCredential;
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const forgotPass = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const logout = () => {
        return signOut(auth);
    }

    const reloadUser = async () => {
        try {
            await reload(auth.currentUser);
            setUser(auth.currentUser);
            console.log("reloaded")
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