import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { UserAuth } from "./Features/auth/AuthContext";
import '../css/Home.css';

function Home() {
  const { user } = UserAuth();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;


  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">HOME</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="home-date">{formattedDate}</p>
        </div>
      </div>
      <span className="home-subtitle">Welcome<b>, {user.firstName}!</b></span>

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



export default Home;


