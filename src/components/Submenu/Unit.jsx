import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

import { UserAuth } from ".././Features/auth/AuthContext";

import '../../css/Submenu.css';


function Unit() {
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

  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose a Bus Route");

  const [tableData, setTableData] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
   ]);

  const routesData = {
    "Gaisano Mall - Alubijid": [["101", "00", "00"], ["102", "00", "00"], ["103", "00", "00"],, ["104", "00", "00"],["105", "00", "00"]],
    "Gaisano Mall - Laguindingan": [["201", "00", "00"], ["202", "00", "00"], ["203", "00", "00"],, ["204", "00", "00"],["205", "00", "00"]],
    "Gaisano Mall - Libertad": [["301", "00", "00"], ["302", "00", "00"], ["303", "00", "00"],, ["304", "00", "00"],["305", "00", "00"]],
    "Gaisano Mall - Tagoloan": [["401", "00", "00"], ["402", "00", "00"], ["403", "00", "00"],, ["404", "00", "00"],["405", "00", "00"]],
    "Gaisano Mall - Villanueva": [["501", "00", "00"], ["502", "00", "00"], ["503", "00", "00"],, ["504", "00", "00"],["505", "00", "00"]],
  };
   

  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">Unit Updates</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date"><small>Today</small><br />{formattedDate}</p>
        </div>
      </div>
      <span className="submenu-subtitle">
        {user.firstName ? (
          <React.Fragment>
            Welcome<b>, {user.firstName}!</b>
          </React.Fragment>
        ) : (
          "Loading..."
        )}</span>


      <div className="submenu-dropdown">
        <div className="dropdown">
          <div onClick={(e) => { setIsActive(!isActive); }} className="dropdown-btn">
            {selected}
            <p className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"} />
          </div>
          <div className="dropdown-content" style={{ display: isActive ? "block" : "none" }}>
                <div onClick={(e) => {
                  setIsSelected(e.target.textContent.trim());
                  setTableData(routesData[e.target.textContent.trim()]);
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Alubijid
                  </div>
                <div onClick={(e) => {
                  setIsSelected(e.target.textContent.trim());
                  setTableData(routesData[e.target.textContent.trim()]);
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Laguindingan
                </div>
                <div onClick={(e) => {
                  setIsSelected(e.target.textContent.trim());
                  setTableData(routesData[e.target.textContent.trim()]);
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Libertad
                </div>
                <div onClick={(e) => {
                  setIsSelected(e.target.textContent.trim());
                  setTableData(routesData[e.target.textContent.trim()]);
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Tagoloan
                </div>
                <div onClick={(e) => {
                  setIsSelected(e.target.textContent.trim());
                  setTableData(routesData[e.target.textContent.trim()]);
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Villanueva
                </div>
          </div>
        </div>
      </div>

      <h2 className="table-title"><b>{selected}</b></h2>
      <p className="table-subtitle"><i>This is reflected from the Mobile Application</i></p>
      <div className="passenger-table-container">
        <table className="passenger-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Bus Capacity</th>
              <th>Vehicle Passenger Count</th>
            </tr>
          </thead>
          <tbody>
                {tableData && tableData.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
        </table>
      </div>

    </div>



  );
}



export default Unit;


