import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { UserAuth } from "../Features/auth/AuthContext";


import {MdDelete, MdEdit, MdDone} from "react-icons/md";

function BusInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [busRoute, setBusRoute] = useState("");
  const [busNumber, setNumber] = useState("");
  const [raspberryPi, setRaspberryPi] = useState("");
  
  const { busInfo, addBusInfo, updateBusInfo, deleteBusInfo, raspberryPiOptions, fetchBusRoutes, busRoutes } = UserAuth();

  const [editedBusRoute, setEditedBusRoute] = useState("");
  const [editedBusNumber, setEditedBusNumber] = useState("");
  const [editedRaspberryPi, setEditedRaspberryPi] = useState("");
  const [editedBus, setEditedBus] = useState(null);

  useEffect(() => {
    fetchBusRoutes();
  }, [fetchBusRoutes]);

  const handleAddBusClick = () => {
    setIsModalOpen(true);
    setModalType("add");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Additional logic to handle closing the modal
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Save the bus route
      await addBusInfo(busRoute, busNumber, raspberryPi);
      closeModal(); // Close the modal after saving
    } catch (error) {
      console.error('Error saving bus info:', error.message);
    }
  };




  return (
    <div className="profile-submenu-container">
      <br />
      <h1 className="info-title">Bus Details</h1>
      <hr className="hrStyle" />
      <br />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2.5 },
          width: 580,
          maxWidth: '100%',
        }}
        noValidate
        autoComplete="off"
      >
        <button type="button" className="add-bus-button" onClick={handleAddBusClick}>
          + Add New Bus
        </button>
        <div>
       <div className="scrollable-info-table">
        <table className="busroute-table">
          <thead>
            <tr>
              <th>Bus Route</th>
              <th>Bus Number</th>
              <th>Raspberry Pi</th>
              <th/><th/>
            </tr>
          </thead>
          <tbody>
            {busInfo.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.busRoute}</td>
                <td>{bus.busNumber}</td>
                <td>{bus.raspberryPi}</td>
                <td>
                    <button style={{ width:'30px', background: 'none', border: 'none'}}>
                      <MdEdit style={{ fontSize: '20px', color:'#8080F8', padding:'5px'}} />
                    </button>
                </td>
                <td>
    <button style={{ width:'30px', background: 'none', border: 'none'}}>
        <MdDelete style={{ fontSize: '20px',  color:'#D5564D', padding:'5px' }} />
    </button>
</td>

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
                  onChange={(e) => setNumber(e.target.value)}
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

    </div>
  );
}

export default BusInfo;
