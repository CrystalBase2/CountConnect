import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

import '../../css/Subpages.css';

function BusFeed() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;


  return (
    <div className="subpages-container">
      <div className="subpages-content">
        <h1 className="subpages-title">LIVE FEED ON GAISANO TERMINAL</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="subpages-date">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default BusFeed;


