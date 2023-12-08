import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase"
import { Alert } from "@mui/material";
import '../../../css/Registration.css'

const Registration = () => {
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert2, setShowAlert2] = useState(false);
  const [alertMessage2, setAlertMessage2] = useState("");
  const [showAlert3, setShowAlert3] = useState(false);
  const [alertMessage3, setAlertMessage3] = useState("");
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!registering) {
        if (password === confirmPassword) {
          setRegistering(true);
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // Use the userId as the document ID
          const userDocRef = doc(db, "users", user.uid);

          // Add user details to Firestore
          await setDoc(userDocRef, {
            userId: user.uid,
            username,
            email: user.email,
            // Add other user details as needed
          });

          // Send email verification
          await sendEmailVerification(user);
          setAlertMessage("Please check your inbox.");
          setShowAlert(true);

        } else {
          setAlertMessage2("Password does not match with confirm password.");
          setShowAlert2(true);
        }
      }
    } catch (error) {
      setAlertMessage3("Password should be at least 6 characters.");
      setShowAlert3(true);

    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-left">
      </div>
      <div className="registration-right">
      {showAlert && (
          <Alert severity="success" style={{ backgroundColor: '#D5B690', color: 'darkgreen', width: '50%', margin: '0 auto' }}>
            <b>Email Sent! </b>{alertMessage}
          </Alert>
        )}

      {showAlert2 && (
          <Alert severity="error" style={{ backgroundColor: '#D5B690', color: 'darkred', width: '90%', margin: '0 auto', whiteSpace: 'nowrap'}}>
            <b>Mismatch Password! </b>{alertMessage2}
          </Alert>
        )}

      {showAlert3 && (
          <Alert severity="warning" style={{ backgroundColor: '#D5B690', color: 'darkbrown', width: '70%', margin: '0 auto', whiteSpace: 'nowrap'}}>
            <b>Weak Password! </b>{alertMessage3}
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