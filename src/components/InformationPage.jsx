import React, { useState } from "react";

function InformationPage() {
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
    <div className="information-page">
      <br />
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => handleInputChange("firstName", e.target.value)}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => handleInputChange("lastName", e.target.value)}
      />

      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => handleInputChange("address", e.target.value)}
      />

      <label htmlFor="contactNumber">Contact Number:</label>
      <input
        type="text"
        id="contactNumber"
        value={contactNumber}
        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />
    </div>
  );
}

export default InformationPage;