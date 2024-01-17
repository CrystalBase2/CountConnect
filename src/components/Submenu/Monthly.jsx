import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

import { UserAuth } from ".././Features/auth/AuthContext";

import '../../css/Submenu.css';


function Monthly() {
  const { user, monthlyReport } = UserAuth();

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
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "]
   ]);

  const routesData = {
    "Gaisano Mall - Alubijid": [["101", monthlyReport.week1, monthlyReport.week2, monthlyReport.week3, monthlyReport.week4, monthlyReport.week5], 
    ["102", "00", "00", "00", "00", "00"], ["103", "00", "00", "00", "00", "00"], 
    ["104", "00", "00", "00", "00", "00"],["105", "00", "00", "00", "00", "00"]],
  };

  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">REPORTS</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date"><small>Today</small><br />{formattedDate}</p>
        </div>
      </div>
      <span className="submenu-pagesub">Monthly</span>
      <span className="reports-submenu-subtitle">
        {user.firstName ? (
          <React.Fragment>
            Welcome<b>, {user.firstName}!</b>
          </React.Fragment>
        ) : (
          "Loading..."
        )}
      </span>


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
                <div className="dropdown-item-reports"> Gaisano Mall - Laguindingan </div>
                <div className="dropdown-item-reports"> Gaisano Mall - Libertad </div>
                <div className="dropdown-item-reports"> Gaisano Mall - Tagoloan </div>
                <div className="dropdown-item-reports"> Gaisano Mall - Villanueva </div>
              </div>
        </div>
      </div>

      <h2 className="table-title"><b>{selected}</b></h2>
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th> Week 1 </th>
              <th> Week 2 </th>
              <th> Week 3 </th>
              <th> Week 4 </th>
              <th> Week 5 </th>
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



export default Monthly;

