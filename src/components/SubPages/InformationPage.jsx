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
      <TextField disabled
        label="First Name"
        value= {user.firstName || " "}
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="firstName"
        className="rounded-input"
        size= "small"
      />
      <TextField disabled
        label="Last Name"
        value= {user.lastName || " "}
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="lastName"
        className="rounded-input"
        size= "small"
      /><br></br>
      <TextField disabled
        label="Address"
        value= {user.address || " "}
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="address"
        className="address-rounded-input"
        size= "small"
      /><br></br>
      <TextField disabled
        label="Contact Number"
        value={user.contactNumber || " "}
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px'},},readOnly: true}}
        type="text"
        id="contactNumber"
        className="rounded-input"
        size= "small"
      />
      <TextField disabled
        label="Email Address" 
        value= {user.email || " "}
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
