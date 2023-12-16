import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../../css/Subpages.css';

import { UserAuth } from "../Features/auth/AuthContext";

function Information() {
  const {user} = UserAuth();
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
      <TextField disabled
        label="First Name"
        value= {user.firstName}
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="firstName"
        className="rounded-input"
        onChange={(e) => handleInputChange("firstName", e.target.value)}
        size= "small"
      /> 
      <TextField disabled
        label="Last Name"
       value= {user.lastName}
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="lastName"
        className="rounded-input"
        onChange={(e) => handleInputChange("lastName", e.target.value)}
        size= "small"
      /><br></br>
      <TextField disabled
        label="Address"
        value= "House No, Street, Barangay, City, Province and Code"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="address"
        className="address-rounded-input"
        onChange={(e) => handleInputChange("address", e.target.value)}
        size= "small"
      /><br></br>
      <TextField disabled
        label="Contact Number"
        value= "+63**********"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="contactNumber"
        className="rounded-input"
        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
        size= "small"
      />
      <TextField disabled
        label="Email Address" 
        value= "email@gmail.com"
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
