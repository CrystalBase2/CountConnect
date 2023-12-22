import React, { useState, useContext, useEffect } from "react";
import { UserAuth } from "../Features/auth/AuthContext";
import '../../css/Submenu.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import { MdDelete, MdEdit} from "react-icons/md";

function BusDriver() {
  const { drivers, addBusDriver } = UserAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [busRoute, setBusRoute] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [idNumber, setIDNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const BusRoute = [
    {
      value: 'Alubijid',
      label: 'Gaisano Mall to Alubijid',
    },
    {
      value: 'Laguindingan',
      label: 'Gaisano Mall to Laguindingan',
    },
    {
      value: 'Libertad',
      label: 'Gaisano Mall to Libertad',
    },
    {
      value: 'Tagoloan',
      label: 'Gaisano Mall to Tagoloan',
    },
    {
      value: 'Villanueva',
      label: 'Gaisano Mall to Villanueva',
    },
  ];

  const handleBusDriver = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBusRoute("");
    setBusNumber("");
    setIDNumber("");
    setDriverName("");
    setContactNumber("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Add new bus driver to Firestore using the addBusDriver function
    await addBusDriver(busRoute, busNumber, idNumber, driverName, contactNumber);

    // Close the modal
    closeModal();
  };

  const handleDeleteChanges = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };


  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">Terminal Drivers</h1>
      </div>
      <h2 className="table-title"><b>Terminal Unit Driver Information</b></h2>

      <button type="button" className="driver-button" onClick={handleBusDriver}>
        + Add New Driver
      </button>

      <div className="passenger-table-container">
        <table className="busdriver-table">
          <thead>
            <tr>
              <th>Bus Route</th>
              <th>Bus Number</th>
              <th>ID Number</th>
              <th>Driver's Name</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.busRoute}</td>
                <td>{driver.busNumber}</td>
                <td>{driver.idNumber}</td>
                <td>{driver.driverName}</td>
                <td>{driver.contactNumber}</td>
                <td><button><MdEdit style={{ fontSize: '25px', color:'#8080F8' }} /></button></td>
                <td><button onClick={handleDeleteChanges}><MdDelete style={{ fontSize: '25px',  color:'#D5564D' }} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new driver */}
      {isModalOpen && (
        <Box

          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Driver</h3>
              <br></br>
              <form onSubmit={handleSave}>
                <TextField
                  select
                  id="outlined-select-route"
                  label="Bus Route"
                  value={busRoute || "Alubijid"}
                  onChange={(e) => setBusRoute(e.target.value)}
                  helperText="Please select driver's bus route"
                  size="small"
                >
                  {BusRoute.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> <br></br>
                <TextField
                  type="text"
                  value={busNumber}
                  label="Bus Number"
                  onChange={(e) => setBusNumber(e.target.value)}
                  size="small"
                /><br></br>
                <TextField
                  type="text"
                  value={idNumber}
                  label="Employee ID Number"
                  onChange={(e) => setIDNumber(e.target.value)}
                  size="small"
                /><br></br>
                <TextField
                  type="text"
                  value={driverName}
                  label="Driver's Name"
                  onChange={(e) => setDriverName(e.target.value)}
                  size="small"
                /><br></br>
                <TextField
                  type="text"
                  value={contactNumber}
                  label="Contact Number"
                  onChange={(e) => setContactNumber(e.target.value)}
                  size="small"
                />

                <div className="modal-buttons">
                  <button type="submit">Save Information</button>
                  <button type="button" onClick={closeModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h5>Are you sure you wanted to delete driver information?</h5>
            <br/>
            <form onSubmit={handleDeleteChanges}>
              <div className="modal-buttons">
                <button type="submit">Delete Driver</button>
                <button type="button" onClick={closeDeleteModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusDriver;