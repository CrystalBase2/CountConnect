import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import '../css/Profile.css';

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
      <span className="profile-subtitle">Welcome<b>, USER!</b></span>

      <div className="passenger-table-container">
        <table className="passenger-table">
          <thead>
            <tr>
              <th>Bus Route</th>
              <th>Passengers Waiting</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gaisano Mall - Alubijid</td>
              <td>00</td>
            </tr>
            <tr>
              <td>Gaisano Mall - Libertad</td>
              <td>00</td>
            </tr>
            <tr>
              <td>Gaisano Mall - Laguindingan</td>
              <td>00</td>
            </tr>
            <tr>
              <td>Gaisano Mall - Tagoloan</td>
              <td>00</td>
            </tr>
            <tr>
              <td>Gaisano Mall - Villanueva</td>
              <td>00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  );
}



export default Profile;


