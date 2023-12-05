import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

import '../../css/Submenu.css';


function Webcam() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Choose a bus route");

  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">LIVE MONITORING</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date">{formattedDate}</p>
        </div>
      </div>
      <span className="submenu-pagesub">Daily</span>
      <span className="reports-submenu-subtitle">Welcome<b>, USER!</b></span>

      </div>



);
}



export default Webcam;