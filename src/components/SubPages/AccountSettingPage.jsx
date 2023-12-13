import React, { useState } from "react";
import '../../css/Subpages.css';

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

  return (
    <div className="profile-submenu-container">
    <br></br> 
    <h1 className = "info-title">Edit Profile</h1>
    <hr></hr>
    <br></br>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        className="name-rounded-input"
        value={firstName}
        onChange={(e) => handleInputChange("firstName", e.target.value)}
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        className="name-rounded-input"
        value={lastName}
        onChange={(e) => handleInputChange("lastName", e.target.value)}
      /><br></br>
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        className="details-rounded-input"
        value={address}
        onChange={(e) => handleInputChange("address", e.target.value)}
      /><br></br>
      <label htmlFor="contactNumber">Contact Number:</label>
      <input
        type="text"
        id="contactNumber"
        className="contact-rounded-input"
        value={contactNumber}
        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
      /><br></br>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        className="details-rounded-input"
        value={email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />
      <button type="button" className="edit-profile-button" onClick="">
        Save
      </button>
    </div>
    
  );
}

export default EditProfilePage;