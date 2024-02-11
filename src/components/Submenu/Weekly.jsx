import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { UserAuth } from ".././Features/auth/AuthContext";
import '../../css/Submenu.css';

function Weekly() {
  const { user, weeklyReport, busRoutes, busInfo } = UserAuth();

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
  const [selected, setSelected] = useState("Choose a Bus Route");

  // Filter busInfo based on selected route
  const filteredBusInfo = busInfo.filter(info => info.busRoute === selected);

  // Initialize table data with default values
  const tableData = filteredBusInfo.map(bus => {
    return {
      busNumber: bus.busNumber,
      Sunday: weeklyReport.Sunday[bus.busNumber]?.totalPeopleInside || "00",
      Monday: weeklyReport.Monday[bus.busNumber]?.totalPeopleInside || "00",
      Tuesday: weeklyReport.Tuesday[bus.busNumber]?.totalPeopleInside || "00",
      Wednesday: weeklyReport.Wednesday[bus.busNumber]?.totalPeopleInside || "00",
      Thursday: weeklyReport.Thursday[bus.busNumber]?.totalPeopleInside || "00",
      Friday: weeklyReport.Friday[bus.busNumber]?.totalPeopleInside || "00",
      Saturday: weeklyReport.Saturday[bus.busNumber]?.totalPeopleInside || "00"
    };
  });

  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">REPORTS</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date"><small>Today</small><br />{formattedDate}</p>
        </div>
      </div>
      <span className="submenu-pagesub">Weekly</span>
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
                  setSelected(route);
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
      <div className="weekly-table-container">
        <table className="weekly-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.busNumber}</td>
                <td>{weeklyReport.Sunday.totalPeopleInside}</td>
                <td>{weeklyReport.Monday.totalPeopleInside}</td>
                <td>{weeklyReport.Tuesday.totalPeopleInside}</td>
                <td>{weeklyReport.Wednesday.totalPeopleInside}</td>
                <td>{weeklyReport.Thursday.totalPeopleInside}</td>
                <td>{weeklyReport.Friday.totalPeopleInside}</td>
                <td>{weeklyReport.Saturday.totalPeopleInside}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Weekly;
