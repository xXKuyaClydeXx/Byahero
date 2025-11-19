import React, { useState, useEffect } from "react";
import "../css/DriverPage.css";

const DriverSchedulePage = () => {
  const [driverInfo, setDriverInfo] = useState({
    name: "Juan Dela Cruz", // static
    vehicleType: "Van", // static
    terminal: "Naga Central Terminal",
    vehicleSeat: 15,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Schedule updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="driver-schedule-container">
      <h2>Driver Schedule</h2>
      <div className="schedule-card">
        <div className="schedule-item">
          <label>Driver Name:</label>
          <p>{driverInfo.name}</p>
        </div>
        <div className="schedule-item">
          <label>Vehicle Type:</label>
          <p>{driverInfo.vehicleType}</p>
        </div>
        <div className="schedule-item">
          <label>Driver Terminal:</label>
          {isEditing ? (
            <input
              type="text"
              name="terminal"
              value={driverInfo.terminal}
              onChange={handleChange}
            />
          ) : (
            <p>{driverInfo.terminal}</p>
          )}
        </div>
        <div className="schedule-item">
          <label>Vehicle Seat Capacity:</label>
          {isEditing ? (
            <input
              type="number"
              name="vehicleSeat"
              value={driverInfo.vehicleSeat}
              onChange={handleChange}
            />
          ) : (
            <p>{driverInfo.vehicleSeat}</p>
          )}
        </div>

        <div className="schedule-buttons">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverSchedulePage;