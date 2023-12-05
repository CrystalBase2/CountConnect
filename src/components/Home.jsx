import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import '../css/Home.css';

function Home() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose a bus route");

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">HOME</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="home-date">{formattedDate}</p>
        </div>
      </div>
      <span className="home-subtitle">Welcome<b>, USER!</b></span>


      <div className="home-dropdown">
        <div className="dropdown">
          <div onClick={(e) => { setIsActive(!isActive); }} className="dropdown-btn">
            {selected}
            <p className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"} />
          </div>
          <div className="dropdown-content" style={{ display: isActive ? "block" : "none" }}>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Alubijid
            </div>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Laguindingan
            </div>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Libertad
            </div>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Tagoloan
            </div>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Villanueva
            </div>
          </div>
        </div>
      </div>
      <div className="passenger-table-container">
        <table className="passenger-table">
          <thead>
            <tr>
              <th>Terminal</th>
              <th>Passengers Waiting</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alubijid</td>
              <td>20</td>
            </tr>
            <tr>
              <td>Gaisano Mall</td>
              <td>25</td>
            </tr>
            <tr>
              <td>Villanueva</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Tagoloan</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Laguindingan</td>
              <td>15</td>
            </tr>
            <tr>
              <td>Libertad</td>
              <td>8</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  );
}



export default Home;


