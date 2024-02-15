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

  // Find raspberryPiID associated with the selected bus route
  const raspberryPiID = filteredBusInfo.length > 0 ? filteredBusInfo[0].raspberryPi : null;
  // console.log(filteredBusInfo)
  // console.log(raspberryPiID)


  // Initialize table data with default values
  const tableData = filteredBusInfo.map(bus => {
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Initialize an object to store the filtered report data by days
    const filteredDailyReport = {};

    // Iterate over each day in dayName array
    dayName.forEach(day => {
      // Check if weeklyReport exists and matches raspberryPiID
      if (weeklyReport && weeklyReport[day] && weeklyReport[day].raspberryPiID === raspberryPiID) {
        // If it matches, add the report data to filteredDailyReport under the corresponding day name
        filteredDailyReport[day] = { dayName: day, ...weeklyReport[day] };
      }
    });

    console.log(filteredDailyReport);

    return {
      busNumber: bus.busNumber,
      weeklyReport: filteredDailyReport
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
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((bus, index) => (
              <tr key={index}>
                <td>{bus.busNumber}</td>
                <td>{bus.weeklyReport && bus.weeklyReport.Sunday ? bus.weeklyReport.Sunday.totalPeopleInside : '0'}</td>
                <td>{bus.weeklyReport && bus.weeklyReport.Monday ? bus.weeklyReport.Monday.totalPeopleInside : '0'}</td>
                <td>{bus.weeklyReport && bus.weeklyReport.Tuesday ? bus.weeklyReport.Tuesday.totalPeopleInside : '0'}</td>
                <td>{bus.weeklyReport && bus.weeklyReport.Wednesday ? bus.weeklyReport.Wednesday.totalPeopleInside : '0'}</td>
                <td>{bus.weeklyReport && bus.weeklyReport.Thursday ? bus.weeklyReport.Thursday.totalPeopleInside : '0'}</td>
                <td>{bus.weeklyReport && bus.weeklyReport.Friday ? bus.weeklyReport.Friday.totalPeopleInside : '0'}</td>
                <td>{bus.weeklyReport && bus.weeklyReport.Saturday ? bus.weeklyReport.Saturday.totalPeopleInside : '0'}</td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Weekly;
