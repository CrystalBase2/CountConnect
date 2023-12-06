import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import '../../css/Subpages.css';

function Profile() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;


  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1 className="profile-title">PROFILE</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="profile-date">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}



export default Profile;


