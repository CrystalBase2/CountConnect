import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import '../../css/Subpages.css';

function InformationPage() {
    return (
        <div>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            defaultValue= "Input Name Here"x
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </div>
    );
  }


export default InformationPage;