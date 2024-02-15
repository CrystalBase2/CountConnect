import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { UserAuth } from ".././Features/auth/AuthContext";
import '../../css/Submenu.css';

function Daily() {
  const { user, dailyReport, busRoutes, busInfo } = UserAuth();
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

  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose a Bus Route");

  // Filter busInfo based on selected route
  const filteredBusInfo = busInfo.filter(info => info.busRoute === selected);

  // Find raspberryPiID associated with the selected bus route
  const raspberryPiID = filteredBusInfo.length > 0 ? filteredBusInfo[0].raspberryPi : null;

  // Filter dailyReport based on raspberryPiID
  const filteredDailyReport = dailyReport && dailyReport.raspberryPiID === raspberryPiID ? dailyReport : null;

  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">REPORTS</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date"><small>Today</small><br />{formattedDate}</p>
        </div>
      </div>
      <span className="submenu-pagesub">Daily</span>
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
            {busRoutes.map((route, index) => (
              <div
                key={index}
                onClick={() => {
                  setIsSelected(route);
                  setIsActive(false);
                }}
                className="dropdown-item"
              >
                {route}
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="table-title"><b>{selected}</b></h2>
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Morning</th>
              <th>Afternoon</th>
              <th>Evening</th>
            </tr>
          </thead>
          <tbody>
            {filteredBusInfo.map((bus, index) => (
              <tr key={index}>
                <td>{bus.busNumber}</td>
                <td>{filteredDailyReport ? filteredDailyReport.totalPeopleInsideMorning || 0 : 0}</td>
                <td>{filteredDailyReport ? filteredDailyReport.totalPeopleInsideAfternoon || 0 : 0}</td>
                <td>{filteredDailyReport ? filteredDailyReport.totalPeopleInsideEvening || 0 : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Daily;
