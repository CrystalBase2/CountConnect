import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  const handleLogin = () => {
    // Simulate a successful login, then navigate to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-left"></div>
      <div className="login-right">
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

          <button type="submit" className="login-button" onClick={handleLogin}>
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

}
export default Login;
