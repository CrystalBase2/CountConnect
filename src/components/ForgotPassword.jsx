import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "@mui/material";
import "../css/ForgotPassword.css";
import { UserAuth } from "./Features/auth/AuthContext";

function ForgotPassword() {
  const navigate = useNavigate();
  const { user, forgotPass } = UserAuth();
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPass(email);
      setAlert({ show: true, severity: 'success', message: 'Email sent successfully. Please check your inbox.' });
      setTimeout(() => {
        setAlert({ show: false, severity: 'success', message: '' });
        navigate('/');
      }, 5000);
    } catch (error) {
      console.log(error)
      setAlert({ show: true, severity: 'error', message: 'Invalid Email. Please check your email address.' });
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-left"></div>
      <div className="forgotpassword-right">

        {alert.show && (
          <Alert severity={alert.severity} style={{ backgroundColor: "#D5B690", color: alert.severity === "success" ? "darkgreen" : "darkred", width: "max-content", margin: "0 auto", whiteSpace: "nowrap"}}>
            <b>{alert.severity === "success" ? "Success! " : "Error! "}</b>{alert.message}
          </Alert>

        )}

        <h1 className="forgotpassword-title">FORGOT PASSWORD</h1>
        <br></br>
        <br></br>
        <br></br>
        <p className="forgotpassword-signup-link">We’ll be sending you a link to change your password in your registred email.</p>
        <form className="forgotpassword-form" onSubmit={handleSubmit}>
          <div className="forgotpassword-input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Input Email Address Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgotpassword-input"
              required
            />
          </div>
          <br></br>
          <br></br>

          <button type="submit" className="forgotpassword-button">
            SUBMIT
          </button>
        </form>

        <p className="forgotpassword-signup-link">
          Remember your password?{" "}
          <a href="/" className="forgotpassword-link" onClick={handleLogin}>
            Click Here to Login!
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;