import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import '../../css/Webcam.css';


function Webcam() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">LIVE MONITORING</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date">{formattedDate}</p>
        </div>
      </div>
    </div>
);
}

export default Webcam;