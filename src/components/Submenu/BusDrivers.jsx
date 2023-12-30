import React, { useState, useContext, useEffect } from "react";
import { UserAuth } from "../Features/auth/AuthContext";
import '../../css/Submenu.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import {MdMessage, MdDelete, MdEdit, MdDone} from "react-icons/md";

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
    await addBusDriver(busRoute, busNumber, idNumber, driverName, contactNumber);
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

  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const handleEdit = (id) => {
    setEditingRow(id);
    setIsEditing(true);
   };

  const handleUpdate = (id) => {
    setEditingRow(false);
    setIsEditing(false);
   };

   const isFormFilled = () => {
    return busRoute !== "" && busNumber !== "" && idNumber !== "" && driverName !== "" && contactNumber !== "";
   };  
  
  function compare(a, b) {
    if (a.busRoute < b.busRoute) {
      return -1;
    }
    if (a.busRoute > b.busRoute) {
      return 1;
    }
    return 0;
   }
   
  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">Terminal Drivers</h1>
      </div>
      <h2 className="table-title"><b>Terminal Unit Driver Information</b></h2>

      <button type="button" className="driver-button" onClick={handleBusDriver}>
        + Add New Driver
      </button><br/>

      <div className="scrollable-table">
        <table className="busdriver-table">
          <thead>
            <tr>
              <th/>
              <th>Bus Route</th>
              <th>Bus Number</th>
              <th>ID Number</th>
              <th>Driver's Name</th>
              <th>Contact Number</th>
              <th/><th/>
            </tr>
          </thead>
          <tbody>
            {drivers.sort(compare).map((driver) => (
              <tr key={driver.id}>
              <td><button>
                    <MdMessage style={{ fontSize: '25px',  color:'#eed868' }} />
                  </button></td>
               <td>{editingRow === driver.id ? (
                    <select
                      className="edit-input"
                      defaultValue={driver.busRoute}>
                      {BusRoute.map((option, index) => (
                        <option key={index} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>) : (
                    driver.busRoute)}</td>
                <td>{editingRow === driver.id ? (
                  <input
                    className="edit-input"
                    type="text"
                    defaultValue={driver.busNumber}
                    />) : (
                    driver.busNumber)}</td>
                <td>{editingRow === driver.id ? (
                  <input
                    className="edit-input"
                    type="text"
                    defaultValue={driver.idNumber}
                    />) : (
                    driver.idNumber)}</td>
                <td>{editingRow === driver.id ? (
                  <input
                    className="edit-input"
                    type="text"
                    defaultValue={driver.driverName}
                    />) : (
                    driver.driverName)}</td>
                <td>{editingRow === driver.id ? (
                  <input
                    className="edit-input"
                    type="text"
                    defaultValue={driver.contactNumber}
                    />) : (
                    driver.contactNumber)}</td>
                <td>
                  {isEditing && editingRow === driver.id ? (
                    <button onClick={() => handleUpdate(driver.id)}
                    ><MdDone style={{ fontSize: '25px', color:'#458647' }} />
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(driver.id)}>
                      <MdEdit style={{ fontSize: '25px', color:'#8080F8' }} />
                    </button>
                  )}
                  </td>
                <td><button onClick={handleDeleteChanges}>
                      <MdDelete style={{ fontSize: '25px',  color:'#D5564D' }} />
                    </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new driver */}
      {isModalOpen && (
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
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
                placeholder="9xxxxxxxxx"
                maxLength={10}
                label="Contact Number"
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setContactNumber(e.target.value);
                  }
                }}
                size="small"
                />
                <div className="modal-buttons">
                  {!isFormFilled() && <p style={{color: 'red', fontWeight: 'lighter'}}> Please fill all fields.</p>}<br/>
                  <button type="submit" disabled={!isFormFilled()} className="save-button">Save Information</button>
                  <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <medium>Are you sure you wanted to delete driver information?</medium>
            <form onSubmit={handleDeleteChanges}>
              <div className="modal-buttons">
                <button type="submit" className= "del-driver-button">Delete Driver</button>
                <button type="button" className= "cancel-button" onClick={closeDeleteModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusDriver;