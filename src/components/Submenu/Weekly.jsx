import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

import '../../css/Submenu.css';


function Daily() {
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
        <h1 className="submenu-title">REPORTS</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date">{formattedDate}</p>
        </div>
      </div>
      <span className="submenu-pagesub">Weekly</span>
      <span className="submenu-subtitle">Welcome<b>, USER!</b></span>


      <div className="submenu-dropdown">
        <div className="dropdown">
          <div onClick={(e) => { setIsActive(!isActive); }} className="dropdown-btn">
            {selected}
            <p className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"} />
          </div>
          <div className="dropdown-content" style={{ display: isActive ? "block" : "none" }}>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Alubijid
            </div>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Laguindingan
            </div>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Libertad
            </div>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Tagoloan
            </div>
            <div onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
              className="dropdown-item"> Gaisano Mall - Villanueva
            </div>
          </div>
        </div>
      </div>
    </div>



  );
}



export default Daily;


