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
import Webcam from "./Submenu/Webcam";
import BusDriver from "./Submenu/BusDrivers";


import BusFeed from "./SubPages/BusFeed";
import TermiFeed from "./SubPages/TermiFeed";

import '../css/Dashboard.css';
import BusInformation from "./BusInformation";
import BusRoute from "./BusRoute";

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
            <Route path="businformation" element={<BusInformation />} />
            <Route path="busroute" element={<BusRoute />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />

            <Route path = "daily" element={<Daily />} />
            <Route path = "weekly" element={<Weekly />} />
            <Route path = "monthly" element={<Monthly />} />
            <Route path = "unit" element={<Unit />} />
            <Route path = "busdriver" element={<BusDriver />} />

            <Route path = "webcam" element={<Webcam />} />
            <Route path = "webcam/busfeed" element={<BusFeed />} />
            <Route path = "webcam/termifeed" element={<TermiFeed />} />

          </Routes>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
