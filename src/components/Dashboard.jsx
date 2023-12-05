import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar';
import Home from "./Home";
import Profile from "./Profile";
import Reports from "./Reports";

import Daily from "./Submenu/Daily";
import Weekly from "./Submenu/Weekly";
import Monthly from "./Submenu/Monthly";
import Unit from "./Submenu/Unit";

import '../css/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-background">
      <div className="dashcontainer">
        <div className="dashboard">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />
            <Route path = "daily" element={<Daily />} />
            <Route path = "weekly" element={<Weekly />} />
            <Route path = "monthly" element={<Monthly />} />
            <Route path = "unit" element={<Unit />} />
          </Routes>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
