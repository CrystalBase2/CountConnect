import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/ForgotPassword.css'

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  const handleLogin = () => {
    navigate('/');
  };


  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-left">
        
      </div>
      <div className="forgotpassword-right">
        <h1 className="forgotpassword-title">FORGOT PASSWORD</h1>
        <br></br>
        <br></br>
        <br></br>
        <p>We’ll be sending you a link to change your password</p>
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

          <button type="submit" className="forgotpassword-button" onClick={handleLogin}>
            SUBMIT
          </button>
        </form>

        <p className="forgotpassword-signup-link">
          Remember your password?{" "}
          <a href="/" className="forgotpassword-link">
            Click Here to Login!
          </a>
        </p>
        
      </div>
    </div>
  );
}

export default ForgotPassword;
