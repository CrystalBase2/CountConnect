import React from "react";

import '../../css/Submenu.css';


function BusDriver() {

  return (
    <div className="submenu-container">
      <div className="submenu-content">
      </div>

      <h2 className="table-title"><b>Terminal Unit Driver Information</b></h2>
      <div className="passenger-table-container">
        <table className="passenger-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>ID Number</th>
              <th>Driver's Name</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>123456</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
            <tr>
              <td>102</td>
              <td>123457</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
            <tr>
              <td>103</td>
              <td>123458</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
            <tr>
              <td>104</td>
              <td>123459</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
            <tr>
              <td>105</td>
              <td>123450</td>
              <td>Input Here</td>
              <td>09*********</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>



  );
}



export default BusDriver;


