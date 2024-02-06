import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import { UserAuth } from "../components/Features/auth/AuthContext";
import { MdDelete, MdEdit, MdDone } from "react-icons/md";

import '../css/Submenu.css';
import '../css/BusInformation.css';

function BusInformation() {
  const {
    user,
    busInfo,
    addBusInfo,
    updateBusInfo,
    deleteBusInfo,
    fetchBusRoutes,
    busRoutes,
    raspberryPiOptions
  } = UserAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [busRoute, setBusRoute] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [busCapacity, setBusCapacity] = useState("");
  const [raspberryPi, setRaspberryPi] = useState("");
  const [editedBusRoute, setEditedBusRoute] = useState("");
  const [editedBusNumber, setEditedBusNumber] = useState("");
  const [editedBusCapacity, setEditedBusCapacity] = useState("");
  const [editedRaspberryPi, setEditedRaspberryPi] = useState("");
  const [selectedBusId, setSelectedBusId] = useState(null);

  const [busInfoToBeDeleted, setBusInfoToBeDeleted] = useState(null);

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

  useEffect(() => {
    fetchBusRoutes();
  }, [fetchBusRoutes]);

  const handleAddBusClick = () => {
    setIsModalOpen(true);
    setModalType("add");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setBusRoute("");
    setBusNumber("");
    setBusCapacity("");
    setRaspberryPi("");
    setEditedBusRoute("");
    setEditedBusNumber("");
    setEditedBusCapacity("");
    setEditedRaspberryPi("");
    setSelectedBusId(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await addBusInfo(busRoute, busNumber, busCapacity, raspberryPi);
      closeModal();
    } catch (error) {
      console.error('Error saving bus info:', error.message);
    }
  };

    const handleDeleteChanges = (id) => {
    setBusInfoToBeDeleted(id);
    setIsDeleteModalOpen(true);
  };

    const handleDeleteBus = () => {
    if (busInfoToBeDeleted !== null) {
      deleteBusInfo(busInfoToBeDeleted);
      setIsDeleteModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setBusInfoToBeDeleted(null);
    setIsDeleteModalOpen(false);
  };

const handleEditClick = (bus) => {
  setIsModalOpen(true);
  setModalType("edit");
  setSelectedBusId(bus.id);
  setEditedBusRoute(bus.busRoute);
  setEditedBusNumber(bus.busNumber);
  setEditedBusCapacity(bus.busCapacity);
  setEditedRaspberryPi(bus.raspberryPi);
};

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateBusInfo(selectedBusId, {
        busRoute: editedBusRoute,
        busNumber: editedBusNumber,
        busCapacity: editedBusCapacity,
        raspberryPi: editedRaspberryPi,
      });
      closeModal();
    } catch (error) {
      console.error('Error updating bus info:', error.message);
    }
  };



  return (
    <div className="submenu-container">
      <div className="submenu-content">
        <h1 className="submenu-title">BUS INFORMATION</h1>
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


        <button type="button" className="add-bus-button" onClick={handleAddBusClick}>
          + Add New Bus
        </button>

               <div className="scrollable-info-table">
        <table className="busroute-table">
          <thead>
            <tr>
              <th>Bus Route</th>
              <th>Bus Number</th>
              <th>Bus Capacity</th>
              <th>Raspberry Pi</th>
              <th/><th/>
            </tr>
          </thead>
          <tbody>
            {busInfo.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.busRoute}</td>
                <td>{bus.busNumber}</td>
                <td>{bus.busCapacity}</td>
                <td>{bus.raspberryPi}</td>
                <td>
                    <button onClick={() => handleEditClick(bus)} style={{ width:'30px', background: 'none', border: 'none'}}>
                      <MdEdit style={{ fontSize: '20px', color:'#8080F8', padding:'5px'}} />
                    </button>
                </td>
                <td>
                    <button onClick={() => handleDeleteChanges(bus.id)} style={{ width:'30px', background: 'none', border: 'none'}}>
                      <MdDelete style={{ fontSize: '20px',  color:'#D5564D', padding:'5px' }} />
                    </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
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
              <h3>Add New Bus</h3>
              <br></br>
              <form onSubmit={handleSave}>
                <TextField
                  select
                  label="Bus Route"
                  value={busRoute}
                  onChange={(e) => setBusRoute(e.target.value)}
                  size="small"
                >
                  {busRoutes.map((route) => (
                    <MenuItem key={route} value={route}>
                      {route}
                    </MenuItem>
                  ))}
                </TextField>
                <br></br>

                <TextField
                  type="text"
                  label="Bus Number"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                  size="small"
                /><br></br>

                  <TextField
                  type="text"
                  label="Bus Capacity"
                  value={busCapacity}
                  onChange={(e) => setBusCapacity(e.target.value)}
                  size="small"
                /><br></br>

                <TextField
                  select
                  label="Raspberry Pi"
                  value={raspberryPi}
                  onChange={(e) => setRaspberryPi(e.target.value)}
                  size="small"
                >
                  {raspberryPiOptions.map((pi) => (
                    <MenuItem key={pi} value={pi}>
                      {pi}
                    </MenuItem>
                  ))}
                </TextField><br></br>

                <div className="modal-buttons">
                  <button type="submit" className="save-button">Save Information</button>
                  <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </Box>
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
        <h3>Edit Bus Information</h3>
        <br></br>
        <form onSubmit={handleUpdate}>
            <TextField
              select
              label="Bus Route"
              value={editedBusRoute}
              onChange={(e) => setEditedBusRoute(e.target.value)}
              size="small"
            >
              {busRoutes.map((route) => (
                <MenuItem key={route} value={route}>
                  {route}
                </MenuItem>
               ))}
           </TextField>
            <TextField   
            type="text"
            value={editedBusNumber}
            label="Bus Number"
            onChange={(e) => setEditedBusNumber(e.target.value)}
            size="small"
          /><br></br>

            <TextField   
            type="text"
            value={editedBusCapacity}
            label="Bus Capacity"
            onChange={(e) => setEditedBusCapacity(e.target.value)}
            size="small"
          /><br></br>

                <TextField
                  select
                  label="Raspberry Pi"
                  value={editedRaspberryPi}
                  onChange={(e) => setEditedRaspberryPi(e.target.value)}
                  size="small"
                >
                  {raspberryPiOptions.map((pi) => (
                    <MenuItem key={pi} value={pi}>
                      {pi}
                    </MenuItem>
                  ))}
                </TextField><br></br>
          <div className="modal-buttons">
            <button type="submit" className="save-button">Save Changes</button>
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
            <medium>Are you sure you want to delete bus information?</medium>
            <form onSubmit={handleDeleteChanges}>
              <div className="modal-buttons">
                <button type="button" className="del-driver-button" onClick={handleDeleteBus}>Delete Bus</button>
                <button type="button" className= "cancel-button" onClick={closeDeleteModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>



  );
}



export default BusInformation;


