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
  const [selectedRoute, setSelectedRoute] = useState('');

  const [tableData, setTableData] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
   ]);

  const routesData = {
    "Gaisano Mall - Alubijid": [["101", "26", "00"], ["102", "26", "00"], ["103", "26", "00"],, ["104", "26", "00"],["105", "26", "00"]],
    "Gaisano Mall - Laguindingan": [["201", "26", "00"], ["202", "26", "00"], ["203", "26", "00"],, ["204", "26", "00"],["205", "26", "00"]],
    "Gaisano Mall - Libertad": [["301", "26", "00"], ["302", "26", "00"], ["303", "26", "00"],, ["304", "26", "00"],["305", "26", "00"]],
    "Gaisano Mall - Tagoloan": [["401", "26", "00"], ["402", "26", "00"], ["403", "26", "00"],, ["404", "26", "00"],["405", "26", "00"]],
    "Gaisano Mall - Villanueva": [["501", "26", "00"], ["502", "26", "00"], ["503", "26", "00"],, ["504", "26", "00"],["505", "26", "00"]],
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
                  setSelectedRoute(e.target.textContent.trim());
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Alubijid
                  </div>
                <div onClick={(e) => {
                  setIsSelected(e.target.textContent.trim());
                  setTableData(routesData[e.target.textContent.trim()]);
                  setSelectedRoute(e.target.textContent.trim());
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Laguindingan
                </div>
                <div onClick={(e) => {
                  setIsSelected(e.target.textContent.trim());
                  setTableData(routesData[e.target.textContent.trim()]);
                  setSelectedRoute(e.target.textContent.trim());
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Libertad
                </div>
                <div onClick={(e) => {
                  setIsSelected(e.target.textContent.trim());
                  setTableData(routesData[e.target.textContent.trim()]);
                  setSelectedRoute(e.target.textContent.trim());
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Tagoloan
                </div>
                <div onClick={(e) => {
                  setIsSelected(e.target.textContent.trim());
                  setTableData(routesData[e.target.textContent.trim()]);
                  setSelectedRoute(e.target.textContent.trim());
                  setIsActive(!isActive);
                  }}
                  className="dropdown-item"> Gaisano Mall - Villanueva
                </div>
          </div>
        </div>
      </div>

      <h2 className="table-title"><b>{selected}</b></h2>
      <p className="table-subtitle"><i>This is reflected from the Mobile Application</i></p>
      <div className="unit-table-container">
      <table className="unit-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Bus Capacity</th>
              <th>Vehicle Passenger Count</th>
            </tr>
          </thead>
          <tbody>
                {tableData && tableData.map((row, index) => (
                <tr style={{color: index === 0 && selectedRoute === 'Gaisano Mall - Alubijid' ? '#000000' : 'gray', fontWeight: index === 0 && selectedRoute === 'Gaisano Mall - Alubijid' ? 'bold' : 'normal'}} key={index}>
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


