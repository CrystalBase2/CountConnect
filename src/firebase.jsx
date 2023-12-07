// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCE1Ow7BYHkLCjsfwkXxwN1Gn2BP6QmseFs",
    authDomain: "countconnect-1f5f5.firebaseapp.com",
    projectId: "countconnect-1f5f5",
    storageBucket: "countconnect-1f5f5.appspot.com",
    messagingSenderId: "966615620606",
    appId: "1:966615620606:web:622de7a47af81d37023eaf",
    measurementId: "G-T9SF968DWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {
    auth,
    db
}