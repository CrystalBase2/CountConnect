import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

import '../../css/Subpages.css';

function TermiFeed() {
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


  return (
    <div className="subpages-container">
      <div className="subpages-content">
        <h1 className="subpages-title">LIVE FEED ON GAISANO TERMINAL</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="subpages-date"><h7>Today</h7><br/>{formattedDate}</p>
        </div>
      </div>
      <img src="http://192.168.43.45:5000/video_feed" style={{ textAlign: 'center' }} className="terminal-feed" alt="Live feed temporarily unavailable due to camera disconnection.  Thanks for your understanding."/>
    </div>
  );
}

export default TermiFeed;


