import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './Features/auth/AuthContext'; // Import the UserAuth context
import { Alert } from '@mui/material';
import '../css/Login.css';

const Login = () => {
  const { user, signIn } = UserAuth(); // Use the signIn function from the UserAuth context
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });

  const checkIfUserIsVerified = () => {
    if (user && user.emailVerified) {
      return true;
    } else {
      setAlert({ show: true, severity: 'info', message: 'Please check your email.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(false);
    try {
      await signIn(email, password); // Use the signIn function from the UserAuth context
      if (checkIfUserIsVerified()) {
        navigate('/dashboard');
      }
    } catch (error) {
      setAlert({ show: true, severity: 'error', message: 'Please sign up.' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-left"></div>
      <div className="login-right">
      {alert.show && (
          <Alert severity={alert.severity} style={{ backgroundColor: "#D5B690", color: alert.severity === "info" ? "#03396C" : "darkred", width: "max-content", margin: "0 auto", whiteSpace: 'nowrap'}}>
            <b>{alert.severity === "info" ? "Verification Needed! " : "Invalid Credentials! "}</b>{alert.message}
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