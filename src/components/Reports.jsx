import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import '../css/Reports.css';

function Reports() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div className="reports-container">
      <div className="reports-content">
        <h1 className="reports-title">REPORTS</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="reports-date">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default Reports;
