import React, { useState } from "react";
import { FaHome, FaFile, FaUserAlt, FaBusAlt } from "react-icons/fa";
import { BsTable, BsWebcamFill } from "react-icons/bs";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = ({ children }) => {
  const [subNavOpen, setSubNavOpen] = useState(null);

  const toggleSubNav = (index) => {
    setSubNavOpen(subNavOpen === index ? null : index);
  };

  const menuItem = [
    {
      path: "/dashboard/home",
      name: "Home",
      icon: <FaHome />,
      subNav: [
        {path: "./unit", name: "Unit Updates", icon: <FaBusAlt />},
        {path: "./webcam", name: "Live Feed", icon: <BsWebcamFill />},
    ],
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
    },
    {
      name: "Reports",
      icon: <FaFile />,
      subNav: [
        { path: "/dashboard/daily", name: "Daily", icon: <BsTable />},
        { path: "/dashboard/weekly", name: "Weekly", icon: <BsTable />},
        { path: "/dashboard/monthly", name: "Monthly", icon: <BsTable />},
      ],
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
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
              onClick={() => item.subNav && toggleSubNav(index)}
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
              {item.subNav && (
                <div className="arrow-icon">
                  {subNavOpen === index ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </div>
              )}
            </NavLink>
            {subNavOpen === index && item.subNav && item.subNav.map((subItem, subIndex) => (
              <NavLink
                to={subItem.path}
                key={subIndex}
                className="sublink"
                activeClassName="active"
              >
                <div className="sublink_icon">{subItem.icon}</div>
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
