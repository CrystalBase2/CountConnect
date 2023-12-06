import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import '../../css/Webcam.css';

import BusIcon from '../../images/BusIcon.png';
import TerminalIcon from '../../images/TerminalIcon.png';
import { useNavigate } from "react-router-dom";

function Webcam() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const navigate = useNavigate();
  const handleBusFeed = () => {navigate("../SubPages/BusFeed.js");};
  const handleTerminalFeed = () => {navigate("../SubPages/BusFeed.js");};

  
  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">LIVE FEED MONITORING</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date">{formattedDate}</p>
        </div>
      </div>
      <img src={BusIcon} className="bus-photo_img" alt="photo_img"/>
      <img src={TerminalIcon} className="terminal-photo_img" alt="photo_img"/>

      <form>
          <button type="submit" className="login-button" onClick={handleBusFeed}>
            View Bus Live Feed
          </button>
          <button type="submit" className="login-button" onClick={handleTerminalFeed}>
            View Terminal Live Feed
          </button>
        </form>
    </div>
);
}

export default Webcam;