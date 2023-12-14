import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../../css/Subpages.css';
import WarningIcon from '../../images/warning.png';

function EditProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleInputChange = (field, value) => {
    switch (field) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "contactNumber":
        setContactNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactNumber1, setContactNumber1] = useState("");

  const handleSaveChanges = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContactNumber1("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("", contactNumber1);
    closeModal();
  };

  return (
    <div className="profile-submenu-container">
    <br></br> 
    <h1 className = "info-title">Edit Profile</h1>
    <hr className="hrStyle"></hr>
    <br></br>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
        label="First Name"
        defaultValue= "Input Name Here"
        type="text"
        id="firstName"
        className="name-rounded-input"
        onChange={(e) => handleInputChange("firstName", e.target.value)}
        size= "small"
      />
      <TextField
        label="Last Name"
        defaultValue= "Input Name Here"
        type="text"
        id="lastName"
        className="name-rounded-input"
        onChange={(e) => handleInputChange("lastName", e.target.value)}
        size= "small"
      /><br></br>
      <TextField
        label="Address"
        defaultValue= "House No, Street, Barangay, City, Province and Code"
        type="text"
        id="address"
        className="details-rounded-input"
        onChange={(e) => handleInputChange("address", e.target.value)}
        size= "small"
      /><br></br>
      <TextField
        label="Contact Number"
        defaultValue= "Input Active Number Here"
        type="text"
        id="contactNumber"
        className="contact-rounded-input"
        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
        size= "small"
      /><br></br>
      <TextField
        label="Email Address"
        defaultValue= "Input Email Here"
        type="text"
        id="email"
        className="details-rounded-input"
        onChange={(e) => handleInputChange("email", e.target.value)}
        size= "small"
      />
      </div></Box>
      <button type="button" className="edit-profile-button" onClick={handleSaveChanges}>
        Save
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="subpages-modal">
          <img src={WarningIcon} className="warning-photo_img" alt="photo_img"/>
            <h5>Are you sure of the changes?</h5>
            <br></br>
            <form onSubmit={handleSave}>
                <input
                  type="password"
                  placeholder="Input Password to Confirm Changes"
                  value={contactNumber}
                  onChange={(e) => setContactNumber1(e.target.value)}
                />
              <div className="modal-buttons">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
    
  );
}

export default EditProfilePage;