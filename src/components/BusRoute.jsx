import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import { UserAuth } from "../components/Features/auth/AuthContext";
import { MdDelete, MdEdit, MdDone } from "react-icons/md";

import '../css/Submenu.css';
import '../css/BusInformation.css';

function BusRoute() {
    const { user, addBusRoute, fetchBusRoutes, busRoutes } = UserAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [busRoute, setBusRoute] = useState("");

    useEffect(() => {
    fetchBusRoutes();
  }, [busRoutes]);


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Save the bus route
      await addBusRoute(busRoute);
      setIsModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error('Error saving bus route:', error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Additional logic to handle closing the modal
  };

  const handleAddRouteClick = () => {
    setIsModalOpen(true);
    setModalType("add");
  };

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





  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">BUS ROUTES</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date"><small>Today</small><br />{formattedDate}</p>
        </div>
      </div>
      <span className="submenu-subtitle">
        {user.firstName ? (
          <React.Fragment>
            Welcome<b>, {user.firstName}!</b>
          </React.Fragment>
        ) : (
          "Loading..."
        )}</span>


        <button type="button" className="add-route-button" onClick={handleAddRouteClick}>
          + Add New Bus Route
        </button>
        <div>
          <div className="scrollable-info-table">
            <table className="busroute-table">
              <thead>
                <tr>
                  <th/>
                  <th>Routes</th>
                </tr>
              </thead>
            <tbody>
              {busRoutes.map((route, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{route}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>

      {isModalOpen && modalType === "add" && (
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Bus Route</h3>
              <br></br>
              <form onSubmit={handleSave}>
                <TextField
                  type="text"
                  value={busRoute}
                  placeholder="Gaisano - Opol"
                  label="Bus Route"
                  onChange={(e) => setBusRoute(e.target.value)}
                  size="small"
                /><br></br>
                
                <div className="modal-buttons">
                  <button type="submit" className="save-button">Save Information</button>
                  <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
}



export default BusRoute;


