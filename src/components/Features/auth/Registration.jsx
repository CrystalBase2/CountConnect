import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../../firebase"
import '../../../css/Registration.css'

const Registration = () => {
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      if (!registering) {
        if (password === confirmPassword) {
          setRegistering(true);
          await createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
              await sendEmailVerification(auth.currentUser);
              alert("Email Sent");
              navigate("/");
            })
            .catch((error) => {
              alert(error);
            })
        } else {
          alert("Password does not match with confirm password");
        }
      }
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-left">
      </div>
      <div className="registration-right">
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