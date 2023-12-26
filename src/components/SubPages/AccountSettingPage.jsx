import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../../css/Subpages.css';
import WarningIcon from '../../images/warning.png';
import { UserAuth } from "../Features/auth/AuthContext";
import { collection, query, where, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase";


function EditProfilePage() {
  const { user,signIn } = UserAuth();
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [address, setAddress] = useState(user.address || "");
  const [contactNumber, setContactNumber] = useState(user.contactNumber || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  

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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!password) {
      // Show an error message or handle the lack of password
      return;
    }

    try {
      await signIn(user.email, password);
    } catch (error) {
      console.log(error)
      console.error("Password authentication failed:", error.message);
      // Show an error message or handle the authentication failure
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);

    await setDoc(userDocRef, {
      userId: user.uid,
      firstName,
      lastName,
      address,
      contactNumber,
      email,
    });

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
        defaultValue= {user.firstName || " "}
        InputProps={{inputProps: {style: {color: 'black', fontSize: '15px', padding: '10px'},}}}
        type="text"
        id="firstName"
        className="rounded-input"
        onChange={(e) => handleInputChange("firstName", e.target.value)}
        size= "small"
      />
      <TextField
        label="Last Name"
        defaultValue= {user.lastName || " "}
        InputProps={{inputProps: {style: {color: 'black', fontSize: '15px', padding: '10px'},}}}
        type="text"
        id="lastName"
        className="rounded-input"
        onChange={(e) => handleInputChange("lastName", e.target.value)}
        size= "small"
      /><br></br>
      <TextField
        label="Address"
        defaultValue= {user.address || "House No, Street, Barangay, City, Province and Code"}
        InputProps={{inputProps: {style: {color: 'black', fontSize: '15px', padding: '10px'},}}}
        type="text"
        id="address"
        className="address-rounded-input"
        onChange={(e) => handleInputChange("address", e.target.value)}
        size= "small"
      /><br></br>
      <TextField
        label="Contact Number"
        defaultValue={user.contactNumber || "+63**********"}
        InputProps={{inputProps: {style: {color: 'black', fontSize: '15px', padding: '10px'},}}}
        type="text"
        id="contactNumber"
        className="rounded-input"
        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
        size= "small"
      />
      <TextField disabled
        label="Email Address" 
        value= {user.email || " "}
        InputProps={{inputProps: {style: {color: 'gray', fontSize: '15px', padding: '10px', cursor: 'not-allowed'},},readOnly: true}}
        type="text"
        id="email"
        className="rounded-input"
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
                onChange={(e) => setPassword(e.target.value)} 
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
