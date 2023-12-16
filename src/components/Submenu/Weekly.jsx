import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

import '../../css/Submenu.css';


function Weekly() {
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

  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose a bus route");

  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">REPORTS</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="home-date"><h7>Today</h7><br/>{formattedDate}</p>
        </div>
      </div>
      <span className="submenu-pagesub">Weekly</span>
      <span className="reports-submenu-subtitle">Welcome<b>, USER!</b></span>


      <div className="submenu-dropdown">
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

      <h2 className="table-title"><b>(Chosen Bus Here)</b></h2>
      <div className="passenger-table-container">
        <table className="weekly-passenger-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
            <tr>
              <td>102</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
            <tr>
              <td>103</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
            <tr>
              <td>104</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
            <tr>
              <td>105</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>



  );
}



export default Weekly;


