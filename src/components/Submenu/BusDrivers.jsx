import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/Submenu.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

function BusDriver() { 
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busRoute, setSelectedDestination] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [idNumber, setIDNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleBusDriver = () => {
    setIsModalOpen(true);
  };

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

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form fields on modal close
    setSelectedDestination("");
    setBusNumber("");
    setIDNumber("");
    setDriverName("");
    setContactNumber("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Add your logic to save the new driver details
    // For now, let's just log the details
    console.log("Select Route:", busRoute);
    console.log("Bus Number:", busNumber);
    console.log("ID Number:", idNumber);
    console.log("Driver Name:", driverName);
    console.log("Contact Number:", contactNumber);

    // Close the modal
    closeModal();
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
            <tr>
              <td>Destination Here</td>
              <td>101</td>
              <td>123456</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
            <tr>
              <td>Destination Here</td>
              <td>102</td>
              <td>123457</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
            <tr>
              <td>Destination Here</td>
              <td>103</td>
              <td>123458</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
            <tr>
              <td>Destination Here</td>
              <td>104</td>
              <td>123459</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
            <tr>
              <td>Destination Here</td>
              <td>105</td>
              <td>123450</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new driver */}
      {isModalOpen && (
            <Box
            component="form"
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
                <TextField select
                  id="outlined-select-route"
                  label="Bus Route"
                  defaultValue="Alubijid"
                  helperText="Please select driver's bus route"
                  size ="small"
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
                  size ="small"
                /><br></br>
                <TextField
                  type="text"
                  value={idNumber}
                  label="Employee ID Number"
                  onChange={(e) => setIDNumber(e.target.value)}
                  size ="small"
                /><br></br>
                <TextField
                  type="text"
                  value={driverName}
                  label="Driver's Name"
                  onChange={(e) => setDriverName(e.target.value)}
                  size ="small"
                /><br></br>
                <TextField
                  type="text"
                  value={contactNumber}
                  label="Contact Number"
                  onChange={(e) => setContactNumber(e.target.value)}
                  size ="small"
                />

              <div className="modal-buttons">
                <button type="submit">Save Information</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div></Box>
      )}
    </div>
  );
}

export default BusDriver;