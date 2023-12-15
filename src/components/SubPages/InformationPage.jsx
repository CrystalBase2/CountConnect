import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../../css/Subpages.css';

function Information() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="profile-submenu-container">
      <br />
      <h1 className="info-title">Information</h1>
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
        defaultValue= "Text Here"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="firstName"
        className="rounded-input"
        onChange={(e) => handleInputChange("firstName", e.target.value)}
        size= "small"
      />
      <TextField
        label="Last Name"
        defaultValue= "Text Here"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="lastName"
        className="rounded-input"
        onChange={(e) => handleInputChange("lastName", e.target.value)}
        size= "small"
      /><br></br>
      <TextField
        label="Address"
        defaultValue= "House No, Street, Barangay, City, Province and Code"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="address"
        className="address-rounded-input"
        onChange={(e) => handleInputChange("address", e.target.value)}
        size= "small"
      /><br></br>
      <TextField
        label="Contact Number"
        defaultValue= "+63**********"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="contactNumber"
        className="rounded-input"
        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
        size= "small"
      />
      <TextField
        label="Email Address" 
        defaultValue= "email@gmail.com"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="email"
        className="rounded-input"
        onChange={(e) => handleInputChange("email", e.target.value)}
        size= "small"
      />
      </div></Box>


    </div>
  );
}

export default Information;
