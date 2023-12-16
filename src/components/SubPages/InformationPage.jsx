import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../../css/Subpages.css';
import { useQuery } from "react-query";

import { UserAuth } from "../Features/auth/AuthContext";

function Information() {
  const {user} = UserAuth();

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
        value= {user.firstName || ""}
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="firstName"
        className="rounded-input"
        size= "small"
      />
      <TextField
        label="Last Name"
       value= {user.lastName || ""}
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="lastName"
        className="rounded-input"
        size= "small"
      /><br></br>
      <TextField
        label="Address"
        defaultValue= "House No, Street, Barangay, City, Province and Code"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="address"
        className="address-rounded-input"
        size= "small"
      /><br></br>
      <TextField
        label="Contact Number"
        defaultValue= "+63**********"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="contactNumber"
        className="rounded-input"
        size= "small"
      />
      <TextField
        label="Email Address" 
        defaultValue= "email@gmail.com"
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="email"
        className="rounded-input"
        size= "small"
      />
      </div></Box>


    </div>
  );
}

export default Information;
