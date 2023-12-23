import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { UserAuth } from "./Features/auth/AuthContext";
import '../css/Home.css';

function Home() {
  const { user } = UserAuth();
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;
  
  console.log(formattedDate);
  

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">HOME</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="home-date"><h7>Today</h7><br/>{formattedDate}</p>
        </div>
      </div>
      <span className="home-subtitle">
  {user.firstName ? (
    <React.Fragment>
      Welcome<b>, {user.firstName}!</b>
    </React.Fragment>
  ) : (
    "Loading..."
  )}
</span>

      <div className="terminal-table-container">
        <table className="terminal-table">
          <thead>
            <tr>
              <th>Bus Route</th>
              <th>Unit Available</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gaisano Mall - Alubijid</td>
              <td>01</td>
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

export default Home;


