import React, { useState, useContext, useEffect } from "react";
import { UserAuth } from "../Features/auth/AuthContext";
import '../../css/Submenu.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { FaCalendarAlt } from "react-icons/fa";

import {MdMessage, MdDelete, MdEdit, MdDone} from "react-icons/md";

function BusDriver() {
  const { user, drivers, addBusDriver, deleteDriver, updateDriver, busInfo, fetchBusRoutes, } = UserAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [busRoute, setBusRoute] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [idNumber, setIDNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [editedBusRoute, setEditedBusRoute] = useState("");
  const [editedBusNumber, setEditedBusNumber] = useState("");
  const [editedIDNumber, setEditedIDNumber] = useState("");
  const [editedDriverName, setEditedDriverName] = useState("");
  const [editedContactNumber, setEditedContactNumber] = useState("");


  const [driverToBeDeleted, setDriverToBeDeleted] = useState(null);
  const [editedDriver, setEditedDriver] = useState(null);

  const [modalType, setModalType] = useState("add");

    const [selectedBusNumber, setSelectedBusNumber] = useState("");
  const [selectedBusRoute, setSelectedBusRoute] = useState("");

  useEffect(() => {
    fetchBusRoutes(); // Fetch busInfo when the component mounts
  }, [fetchBusRoutes]);

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

  const handleBusDriver = () => {
    setModalType("add");
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
    await addBusDriver(selectedBusRoute, selectedBusNumber, idNumber, driverName, contactNumber);
    closeModal();
  };

  const handleDeleteChanges = (id) => {
    setDriverToBeDeleted(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteDriver = () => {
    if (driverToBeDeleted !== null) {
      deleteDriver(driverToBeDeleted);
      setIsDeleteModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setDriverToBeDeleted(null);
    setIsDeleteModalOpen(false);
  };

  const closeEditModal = () => {
    setEditedDriver(null);
    setIsModalOpen(false);
  };

  const handleEdit = (driver) => {
  setEditedBusRoute(driver.busRoute);
  setEditedBusNumber(driver.busNumber);
  setEditedIDNumber(driver.idNumber);
  setEditedDriverName(driver.driverName);
  setEditedContactNumber(driver.contactNumber);
  setEditedDriver(driver);

  setModalType("edit");
  setIsModalOpen(true);
};

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDriver(editedDriver.id, {
      busRoute: editedBusRoute,
      busNumber: editedBusNumber,
      idNumber: editedIDNumber,
      driverName: editedDriverName,
      contactNumber: editedContactNumber,
    });
    setEditedDriver(null);
    setIsModalOpen(false);
  };

  const handleSendMessage = async (phoneNumber) => {
  // Format the phone number with the country code
  const formattedPhoneNumber = `+63${phoneNumber}`;

  try {
    const response = await fetch(`http://127.0.0.1:5000/send_sms/${formattedPhoneNumber}`, {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Message sent successfully!');
    } else {
      console.error('Error sending message:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
};

   
  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">Terminal Drivers</h1>
          <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date"><small>Today</small><br />{formattedDate}</p>
        </div>
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
            {drivers.map((driver) => (
              <tr key={driver.id}>
              <td><button onClick={() => handleSendMessage(driver.contactNumber)}>
                    <MdMessage style={{ fontSize: '25px',  color:'#eed868' }} />
                  </button></td>
                <td>{driver.busRoute}</td>
                <td>{driver.busNumber}</td>
                <td>{driver.idNumber}</td>
                <td>{driver.driverName}</td>
                <td>{driver.contactNumber}</td>
                <td>
                    <button onClick={() => handleEdit(driver)}>
                      <MdEdit style={{ fontSize: '25px', color:'#8080F8' }} />
                    </button>
                </td>
                    <td>
                    <button onClick={() => handleDeleteChanges(driver.id)}>
                      <MdDelete style={{ fontSize: '25px',  color:'#D5564D' }} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new driver */}
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
              <h3>Add New Driver</h3>
              <br></br>
              <form onSubmit={handleSave}>
                <TextField
                  select
                  label="Bus Number"
                  value={selectedBusNumber}
                  onChange={(e) => {
                    const selectedNumber = e.target.value;
                    setSelectedBusNumber(selectedNumber);

                    const selectedBusInfo = busInfo.find(
                      (info) => info.busNumber === selectedNumber
                    );
                    setSelectedBusRoute(selectedBusInfo ? selectedBusInfo.busRoute : "");
                  }}
                  size="small"
                >
                  {busInfo.map((info) => (
                    <MenuItem key={info.busNumber} value={info.busNumber}>
                      {info.busNumber}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>
                <TextField
                  type="text"
                  label="Bus Route"
                  value={selectedBusRoute}
                  size="small"
                  disabled
                /> <br></br>
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
                  <button type="submit" className="save-button">Save Information</button>
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
            <medium>Are you sure you want to delete driver information?</medium>
            <form onSubmit={handleDeleteChanges}>
              <div className="modal-buttons">
                <button type="button" className="del-driver-button" onClick={handleDeleteDriver}>Delete Driver</button>
                <button type="button" className= "cancel-button" onClick={closeDeleteModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

  {isModalOpen && modalType === "edit" && (
  // Modal for editing an existing driver
  <Box
    sx={{
      '& .MuiTextField-root': { m: 1, width: '30ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Driver</h3>
        <br></br>
        <form onSubmit={handleUpdate}>
        <TextField
                  select
                  label="Bus Number"
                  value={editedBusNumber}
                  onChange={(e) => {
                    const selectedNumber = e.target.value;
                    setSelectedBusNumber(selectedNumber);

                    const selectedBusInfo = busInfo.find(
                      (info) => info.busNumber === selectedNumber
                    );
                    setSelectedBusRoute(selectedBusInfo ? selectedBusInfo.busRoute : "");
                  }}
                  size="small"
                >
                  {busInfo.map((info) => (
                    <MenuItem key={info.busNumber} value={info.busNumber}>
                      {info.busNumber}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>
                <TextField
                  type="text"
                  label="Bus Route"
                  value={editedBusRoute}
                  size="small"
                  disabled
                /> <br></br>
          <TextField
            type="text"
            value={editedIDNumber}
            label="Employee ID Number"
            onChange={(e) => setEditedIDNumber(e.target.value)}
            size="small"
          /><br></br>
          <TextField
            type="text"
            value={editedDriverName}
            label="Driver's Name"
            onChange={(e) => setEditedDriverName(e.target.value)}
            size="small"
          /><br></br>
          <TextField
            type="text"
            value={editedContactNumber}
            placeholder="9xxxxxxxxx"
            maxLength={10}
            label="Contact Number"
            onChange={(e) => {
              if (e.target.value.length <= 10) {
                setEditedContactNumber(e.target.value);
              }
            }}
            helperText="Only 10 digits are allowed"
            size="small"
          />
          <div className="modal-buttons">
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" onClick={closeEditModal} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </Box>
)}
    </div>
  );


}

export default BusDriver;