import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "@mui/material";
import "../../../css/ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setAlertMessage("Password reset email sent successfully. Please check your inbox.");
      setShowAlert(true);
    } catch (error) {
      console.log(error)
      setAlertMessage("Error sending password reset email. Please check your email address.");
      setShowAlert(true);
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-left"></div>
      <div className="forgotpassword-right">

        {showAlert && (
          <Alert severity="info" style={{ backgroundColor: '#D5B690', color: 'darkred', width: '50%', margin: '0 auto' }}>
            <b>Info: </b>{alertMessage}
          </Alert>
        )}

        <h1 className="forgotpassword-title">FORGOT PASSWORD</h1>
        <br></br>
        <br></br>
        <br></br>
        <p className="forgotpassword-signup-link">We’ll be sending you a link to change your password</p>
        <form className="forgotpassword-form" onSubmit={handleSubmit}>
          <div className="forgotpassword-input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
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