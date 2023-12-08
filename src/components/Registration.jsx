import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase"
import { Alert } from "@mui/material";
import '../css/Registration.css'

const Registration = () => {
 const navigate = useNavigate();
 const [registering, setRegistering] = useState(false);
 const [email, setEmail] = useState('');
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');

 const [alert, setAlert] = useState({ show: false, severity: "info", message: "" });

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (user.emailVerified) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { emailVerificationSent: false });
      }
    }
  });

  return () => unsubscribe();
 }, []);

 useEffect(() => {
  if (auth.currentUser && auth.currentUser.emailVerified) {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    updateDoc(userDocRef, { emailVerificationSent: false });
  }
 }, [auth.currentUser]);

 const handleRegister = async (e) => {
   e.preventDefault();
   try {
     if (!registering) {
       if (password.length >= 6 && password === confirmPassword) {
         setRegistering(true);
         const usersRef = collection(db, 'users');
         const q = query(usersRef, where("email", "==", email));
         const querySnapshot = await getDocs(q)

         if (querySnapshot.empty) {
           const userCredential = await createUserWithEmailAndPassword(auth, email, password);
           const user = userCredential.user;

           const userDocRef = doc(db, "users", user.uid);

           await setDoc(userDocRef, {
             userId: user.uid,
             username,
             email: user.email,
             emailVerificationSent: false,
           });

           await sendEmailVerification(user);
           await updateDoc(userDocRef, { emailVerificationSent: true });

           setAlert({ show: true, severity: "success", message: "Email verification sent. Please verify to login." });
           setTimeout(() => {
             setAlert({ show: false, severity: "info", message: "" });
             navigate("/");
           }, 5000); // 5000 milliseconds = 5 seconds
         } else {
           const userDoc = querySnapshot.docs[0];
           const userData = userDoc.data();

           if (userData.emailVerificationSent) {
             setAlert({ show: true, severity: "info", message: "Email verification already sent. Please verify to login" });
           } else {
             setAlert({ show: true, severity: "info", message: "Email already registered and verified. Please use a different email." });
           }
         }
       } else if (password.length < 6 && password === confirmPassword) {
         setAlert({ show: true, severity: "error", message: "Password should be at least 6 characters." });
       } else {
         setAlert({ show: true, severity: "error", message: "Password does not match with confirm password." });
       }
     }
   } catch (error) {
     console.log(error);
   } finally {
     setRegistering(false);
   }
 };

  return (
    <div className="registration-container">
      <div className="registration-left">
      </div>
      <div className="registration-right">
        {alert.show && (
          <Alert severity={alert.severity} style={{ backgroundColor: "#D5B690", color: alert.severity === "success" ? "darkgreen" : "darkred", width: "50%", margin: "0 auto" }}>
            <b>{alert.severity === "success" ? "Success! " : "Error! "}</b>{alert.message}
          </Alert>

        )}

        <h1 className="registration-title">CREATE AN ACCOUNT</h1>
        <form className="registration-form" onSubmit={handleRegister}>
          <div className="registration-input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="registration-input"
              required
            />
          </div>
          <div className="registration-input-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="registration-input"
              required
            />
          </div>
          <div className="registration-input-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="registration-input"
              required
            />
          </div>
          <div className="registration-input-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="registration-input"
              required
            />
          </div>
          <br></br>
          <br></br>
          <button type="submit" className="registration-button">
            REGISTER
          </button>
        </form>
        <br></br>
        <p className="registration-signup-link">
          Already have an account? <Link to="/" className="registration-link">
            Click Here to Login!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;