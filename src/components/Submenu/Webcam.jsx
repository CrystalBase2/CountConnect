import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import '../../css/Webcam.css';

import BusIcon from '../../images/BusIcon.png';
import TerminalIcon from '../../images/TerminalIcon.png';
import { useNavigate } from "react-router-dom";

function Webcam() {
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
  
  const navigate = useNavigate();
  const handleBusFeed = () => {navigate("./busfeed");};
  const handleTerminalFeed = () => {navigate("./termifeed");};

  
  return (
    <div className="webcam-container">
      <div className="webcam-content">
        <h1 className="webcam-title">LIVE FEED MONITORING</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="home-date"><h7>Today</h7><br/>{formattedDate}</p>
        </div>
      </div>
      <img src={BusIcon} className="bus-photo_img" alt="photo_img"/>
      <img src={TerminalIcon} className="terminal-photo_img" alt="photo_img"/>

      <div className="button-container">
      <form>
          <button type="submit" className="bus-button" onClick={handleBusFeed}>
            View Bus Live Feed
          </button>
      </form>
      <form>
          <button type="submit" className="terminal-button" onClick={handleTerminalFeed}>
            View Terminal Live Feed
          </button>
      </form>
      </div>
    </div>
);
}

export default Webcam;