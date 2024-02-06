import React, { useState } from "react";
import { FaHome, FaFile, FaUserAlt, FaBusAlt, FaBus, FaRoute } from "react-icons/fa";
import { BsTable, BsWebcamFill, BsFillPeopleFill } from "react-icons/bs";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { MdBusAlert } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { UserAuth } from "./Features/auth/AuthContext"; // Import UserAuth context
import "../css/Sidebar.css";

const Sidebar = ({ children }) => {
  const [subNavOpen, setSubNavOpen] = useState(null);
  const { logout } = UserAuth(); // Get the logout function from context

const handleLogout = () => {
  // Call the logout function when the Logout button is clicked
  logout();

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
      name: "Bus Units",
      icon: <FaBus />,
      subNav: [
        {path: "/dashboard/busroute", name: "Bus Routes", icon: <FaRoute />},
        {path: "/dashboard/businformation", name: "Bus Registration", icon: <MdBusAlert />},
        {path: "./busdriver", name: "Driver Assigned", icon: <BsFillPeopleFill />},
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
      name: "Logout",
      icon: <BiLogOut />,
      onClick: handleLogout, // Add onClick handler for logout
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
              className={({ isActive }) =>
              isActive ? "link active" : "link"
            }
              onClick={() => {
                item.subNav && setSubNavOpen(subNavOpen === index ? null : index);
                item.onClick && item.onClick(); // Call onClick if provided
              }}
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
                className={({ isActive }) =>
                isActive ? "link active" : "sublink"
              }
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