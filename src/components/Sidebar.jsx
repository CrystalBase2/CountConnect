import React, { useState } from "react";
import { FaHome, FaFile, FaUserAlt, FaCaretDown } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "../css/Sidebar.css";

import Submenu from "./SubMenu";

const Sidebar = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const menuItem = [
    {
      path: "/dashboard/home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      name: "Reports",
      icon: <FaFile />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      dropdown: [
        { path: "/dashboard/daily", name: "Daily" },
        { path: "/dashboard/weekly", name: "Weekly" },
        { path: "/dashboard/monthly", name: "Monthly" },
      ],
      arrow: <FaCaretDown />,
    },
    {
      path: "/dashboard/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/",
      name: "Logout",
      icon: <BiLogOut />,
    },
  ];

  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section"></div>
        {menuItem.map((item, index) => (
          <div key={index}>
            <NavLink
              to={item.path}
              className="link"
              activeClassName="active"
              onClick={item.dropdown && toggleDropdown}
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
            {dropdownOpen && item.dropdown && item.dropdown.map((subItem, subIndex) => (
              <NavLink
                to={subItem.path}
                key={subIndex}
                className="sublink"
                activeClassName="active"
              >
                <div className="sublink_text">{subItem.name}</div>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Sidebar;