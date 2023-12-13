import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import '../css/Profile.css';
import InformationPage from './InformationPage'; // Import your Information mini-page component
import AccountSettingPage from './AccountSettingPage'; // Import your Account Setting mini-page component

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

        <div className="span-tab">
          <span className="profile-submenu-information" onClick={() => handleOptionClick('Information')}>
              <FaUserCog /> <b> Information</b>
          </span>
          <span className="profile-submenu-account" onClick={() => handleOptionClick('AccountSetting')}>
              <IoSettingsSharp /> <b>Account Setting</b>
          </span>
      </div>

      <div className="mini-page-container">
        {selectedOption === 'Information' && <InformationPage />}
        {selectedOption === 'AccountSetting' && <AccountSettingPage />}
      </div>
    </div>
  );
}

export default Profile;