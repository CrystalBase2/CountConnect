import React, { useState } from "react";
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