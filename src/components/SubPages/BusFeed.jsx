import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

import '../../css/Subpages.css';

function BusFeed() {
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
        <h1 className="subpages-title">LIVE FEED ON eBUS VEHICLE</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="subpages-date"><strong>Today</strong><br />{formattedDate}</p>
        </div>
      </div>
      <div className="bus-feed">
        <img src={'http://localhost:5000/video_feed'} alt="none" />
      </div>
    </div>
  );
}

export default BusFeed;
