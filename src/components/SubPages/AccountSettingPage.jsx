import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../../css/Subpages.css';
import WarningIcon from '../../images/warning.png';

import { UserAuth } from "../Features/auth/AuthContext";

function EditProfilePage() {
  const {user} = UserAuth();

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


  const handleSaveChanges = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="profile-submenu-container">
      <br />
      <h1 className="info-title">Edit Profile</h1>
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
      <div>
      <TextField
        label="First Name"
        defaultValue= " "
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},}}}
        type="text"
        id="firstName"
        className="rounded-input"
        onChange={(e) => handleInputChange("firstName", e.target.value)}
        size= "small"
      />
      <TextField
        label="Last Name"
        defaultValue= " "
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},}}}
        type="text"
        id="lastName"
        className="rounded-input"
        onChange={(e) => handleInputChange("lastName", e.target.value)}
        size= "small"
      /><br></br>
      <TextField
        label="Address"
        defaultValue= "House No, Street, Barangay, City, Province and Code"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},}}}
        type="text"
        id="address"
        className="address-rounded-input"
        onChange={(e) => handleInputChange("address", e.target.value)}
        size= "small"
      /><br></br>
      <TextField
        label="Contact Number"
        defaultValue= "+63**********"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},}}}
        type="text"
        id="contactNumber"
        className="rounded-input"
        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
        size= "small"
      />
      <TextField
        label="Email Address" 
        defaultValue= "email@gmail.com"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},}}}
        type="text"
        id="email"
        className="rounded-input"
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
            <img src={WarningIcon} className="warning-photo_img" alt="photo_img" />
            <h5>Are you sure of the changes?</h5>
            <br />
            <form onSubmit={handleSave}>
              <input
                type="password"
                placeholder="Input Password to Confirm Changes"
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
