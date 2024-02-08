import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { UserAuth } from "../Features/auth/AuthContext";
import '../../css/Submenu.css';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';


function Unit() {
  const { numPeople, busRoutes, busInfo, raspberryPiOptions } = UserAuth();

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

  const [selectedRoute, setSelectedRoute] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (selectedRoute) {
      Promise.all(
        busInfo
          .filter(info => info.busRoute === selectedRoute)
          .map(info => {
            const countNumberRef = ref(database, `raspberrypi/${info.raspberryPi}/count_number`);
            return new Promise((resolve, reject) => {
              onValue(countNumberRef, (snapshot) => {
                const countNumber = snapshot.val();
                resolve({ ...info, countNumber });
              }, (error) => {
                reject(error);
              });
            });
          })
      ).then(updatedData => {
        setTableData(updatedData);
      }).catch(error => {
        console.error('Error fetching count numbers:', error);
      });
    }
  }, [selectedRoute, busInfo, raspberryPiOptions]);

  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">Unit Updates</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date"><small>Today</small><br />{formattedDate}</p>
        </div>
      </div>
      <div className="submenu-dropdown">
        <div className="dropdown">
          <div className="dropdown-btn">
            <select onChange={(e) => setSelectedRoute(e.target.value)} value={selectedRoute}>
              <option value="">Choose a Bus Route</option>
              {busRoutes.map((route, index) => (
                <option key={index} value={route}>{route}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <h2 className="table-title"><b>{selectedRoute}</b></h2>
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
            {tableData && tableData.map((info, index) => (
              <tr key={index}>
                <td>{info.busNumber}</td>
                <td>{info.busCapacity}</td>
                <td>{info.countNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Unit;
