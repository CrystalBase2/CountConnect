import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../../css/BusInformation.css';
import WarningIcon from '../../images/warning.png';
import { UserAuth } from "../Features/auth/AuthContext";
import { collection, query, where, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase";

function BusRoute() {
  const { addBusRoute, fetchBusRoutes, busRoutes } = UserAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [busRoute, setBusRoute] = useState("");

    useEffect(() => {
    fetchBusRoutes(); // Fetch bus routes when the component mounts
  }, []);

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

  return (
    <div className="profile-submenu-container">
      <br />
      <h1 className="info-title">Bus Route</h1>
      <hr className="hrStyle" />
      <br />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2.5},
          width: 580,
          maxWidth: '100%',
        }}
        noValidate
        autoComplete="off"
      >
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
      </Box>

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
                  placeholder="xxxxx to xxxxx"
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
