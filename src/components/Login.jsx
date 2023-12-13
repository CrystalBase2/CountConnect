import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './Features/auth/AuthContext';
import { Alert } from '@mui/material';
import '../css/Login.css';

const Login = () => {
  const { user, signIn, reloadUser } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
  const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(false);
    try {
      const userCredential = await signIn(email, password);
      if (userCredential.user.emailVerified) {
        setPassword('');
        setLoginSuccess(false); // Reset login success state
        window.location.href = '/dashboard';
      } else {
        setAlert({ show: true, severity: 'info', message: 'Please check your email.' });
        setLoginSuccess(true); // Set login to true then return false
      }
    } catch (error) {
      setAlert({ show: true, severity: 'error', message: 'Invalid Credentials!' });
      setPassword(''); // Clear password field on error
      setLoginSuccess(false); // Reset login success state on error
    }
   };

  useEffect(() => {
    // Clear password field when loginSuccess changes
    if (loginSuccess) {
      setPassword('');
      setLoginSuccess(false); // Reset login success state
    }
  }, [loginSuccess]);

  return (
    <div className="login-container">
      <div className="login-left"></div>
      <div className="login-right">
        {alert.show && (
          <Alert
            severity={alert.severity}
            style={{
              backgroundColor: '#D5B690',
              color: alert.severity === 'info' ? '#03396C' : 'darkred',
              width: 'max-content',
              margin: '0 auto',
              whiteSpace: 'nowrap',
            }}
          >
            <b>{alert.severity === 'info' ? 'Verification Needed! ' : 'Invalid Credentials! '}</b>
            {alert.message}
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
          Don't have an account?{' '}
          <a href="/Registration" className="login-link">
            Sign Up Here!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;