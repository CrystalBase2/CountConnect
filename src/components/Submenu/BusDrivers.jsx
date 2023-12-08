import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/Submenu.css';

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
        Add New Driver
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
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Driver</h2>
            <br></br>
            <form onSubmit={handleSave}>
            <label>
                Select Bus Route:
                <select
                  value={busRoute}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="destination-dropdown"
                >
                <option value="Alubijid">Gaisano Mall - Alubijid</option>
                <option value="Laguindingan">Gaisano Mall - Laguindingan</option>
                <option value="Libertad">Gaisano Mall - Libertad</option>
                <option value="Tagoloan">Gaisano Mall - Tagoloan</option>
                <option value="Villanueva">Gaisano Mall - Villanueva</option>
              </select>
            </label>
            <label>
                Bus Number:
                <input
                  type="text"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                />
              </label>
              <label>
                ID Number:
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIDNumber(e.target.value)}
                />
              </label>
              <label>
                Driver's Name:
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                />
              </label>
              <label>
                Contact Number:
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </label>
              <div className="modal-buttons">
                <button type="submit">Save Information</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusDriver;