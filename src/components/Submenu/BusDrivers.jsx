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
              <th>Morning</th>
              <th>Afternoon</th>
              <th>Evening</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
            <tr>
              <td>102</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
            <tr>
              <td>103</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
            <tr>
              <td>104</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
            <tr>
              <td>105</td>
              <td>00</td>
              <td>00</td>
              <td>00</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>



  );
}



export default BusDriver;


