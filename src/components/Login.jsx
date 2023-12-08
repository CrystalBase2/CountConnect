import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Alert } from "@mui/material";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const checkIfUserIsVerified = (user) => {
    if (user && user.emailVerified) {
      return true;
    } else {
      setAlertMessage("Verification Needed");
      setShowAlert(true);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (checkIfUserIsVerified(user)) {
        navigate("/dashboard");
      }
    } catch (error) {
      setAlertMessage("Invalid Credentials");
      setShowAlert(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left"></div>
      <div className="login-right">
        {showAlert && (
          <Alert severity="warning" style={{ backgroundColor: '#D5B690', color: 'darkred', width: '50%', margin: '0 auto' }}>
            <b>Warning! </b>{alertMessage}
          </Alert>
        )}

        <h1 className="login-title">LOGIN TO YOUR</h1>
        <h1 className="login-subtitle">ACCOUNT</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="login-input-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <br></br>
          <p className="login-forgotpassword-link">
            <a href="/ForgotPassword" className="login-forgotpassword">
              Forgot Password?
            </a>
          </p>
          <br></br>
          <br></br>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>

        <br></br>
        <p className="login-signup-link">
          Don't have an account?{" "}
          <a href="/Registration" className="login-link">
            Sign Up Here!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;