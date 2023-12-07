import React from "react";
import '../css/Profile.css';

function Profile() {


  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1 className="profile-title">PROFILE</h1>

        <span className = "profile-subtitle" >Information</span>

        <form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>

        </div>
      </div>
      
  );
}


export default Profile;


