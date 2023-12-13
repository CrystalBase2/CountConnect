import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import '../css/Profile.css';

import InformationPage from './SubPages/InformationPage';
import AccountSettingPage from './SubPages/AccountSettingPage';

import ProfileIcon from '../images/Profile.png';

function Profile() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1 className="profile-title">PROFILE</h1>
        <div className="date-icon">
          <FaCalendarAlt />
          <p className="submenu-date">{formattedDate}</p>
        </div>
      </div>

      <span className="profile-subtitle" onClick={() => handleOptionClick('Welcome')}>
          Welcome<b>, USER!</b>
        </span>

      <div className="mini-page-container">
        {selectedOption === 'Information' && <InformationPage />}
        {selectedOption === 'AccountSetting' && <AccountSettingPage />}
      </div>

      <div class="card">
        <img src={ProfileIcon} className="profile-photo_img" alt="Card image"/>
        <div class="card-body">
          <h5 class="card-title">Insert Name Here</h5>
          <p class="card-text">Operator</p>
          <button type="submit" className="profile-submenu-information" onClick={() => handleOptionClick('Information')}>
          <FaUserCog/> Information
          </button>
          <button type="submit" className="profile-submenu-account" onClick={() => handleOptionClick('AccountSetting')}>
          <IoSettingsSharp/> Account Setting
          </button>
        </div>
      </div>


    </div>
    
    
  );
}

export default Profile;