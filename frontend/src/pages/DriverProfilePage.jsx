// frontend/src/pages/DriverProfilePage.jsx

import React, { useEffect, useState } from "react";
import { Edit3, Save, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/DriverProfilePage.css";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";

// =========================
// FORMAT JOINED DATE
// =========================
const formatJoined = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const DriverProfilePage = () => {
  const [driver, setDriver] = useState(null);
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(null);

  // =========================
  // FETCH USER DATA
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDriver(res.data);
        setTemp(res.data);
      })
      .catch((err) => {
        console.error("Error loading driver profile:", err);
      });
  }, []);

  if (!driver) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Loading profile...
      </p>
    );
  }

  // =========================
  // HANDLERS
  // =========================
  const handleChange = (key, value) => {
    setTemp({ ...temp, [key]: value });
  };

  const handleSave = () => {
    setDriver(temp);
    setEditing(false);
  };

  const handleCancel = () => {
    setTemp(driver);
    setEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  // =========================
  // FALLBACK IMAGES
  // =========================
  const defaultProfile =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const defaultDoc =
    "https://cdn-icons-png.flaticon.com/512/1829/1829412.png";

  return (
    <div className="driver-profile-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
        </div>

        <div className="nav-links">
          <Link to="/driverdashboard" className="nav-link">Home</Link>
          <Link to="/driverschedule" className="nav-link">Schedule</Link>
          <span className="nav-link active">Profile</span>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* EDIT BUTTON */}
      <div className="edit-buttons-container">
        {!editing ? (
          <button className="edit-btn" onClick={() => setEditing(true)}>
            <Edit3 size={16} /> Edit Profile
          </button>
        ) : (
          <>
            <button className="edit-btn save" onClick={handleSave}>
              <Save size={16} /> Save
            </button>
            <button className="edit-btn cancel" onClick={handleCancel}>
              <X size={16} /> Cancel
            </button>
          </>
        )}
      </div>

      {/* MAIN PROFILE CARD */}
      <div className="profile-container">
        <div className="profile-card">

          {/* PROFILE HEADER */}
          <div className="profile-header-modern">
            <img
              src={driver.profileImageUrl || defaultProfile}
              alt="Profile"
              className="profile-avatar-modern"
            />

            <div className="profile-info-modern">

              {/* NAME */}
              {!editing ? (
                <h2 className="profile-name">{driver.fullName}</h2>
              ) : (
                <input
                  className="input-edit"
                  value={temp.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              )}

              {/* EMAIL */}
              <p className="profile-sub">{driver.email}</p>

              {/* CONTACT */}
              {!editing ? (
                <p className="profile-sub">Contact: {driver.contactNumber}</p>
              ) : (
                <input
                  className="input-edit"
                  value={temp.contactNumber}
                  onChange={(e) => handleChange("contactNumber", e.target.value)}
                />
              )}

              {/* REPLACED BIRTHDAY → JOINED DATE */}
              <p className="profile-sub">
                Joined: {formatJoined(driver.createdAt)}
              </p>
            </div>
          </div>

          {/* GRID OF CARDS */}
          <div className="card-grid">
            {/* Vehicle Type */}
            <div className="info-card">
              <p>Vehicle Type</p>
              {!editing ? (
                <h3>{driver.vehicleType}</h3>
              ) : (
                <input
                  className="input-edit"
                  value={temp.vehicleType}
                  onChange={(e) => handleChange("vehicleType", e.target.value)}
                />
              )}
            </div>

            {/* Route */}
            <div className="info-card">
              <p>Route</p>
              {!editing ? (
                <h3>{driver.routes}</h3>
              ) : (
                <input
                  className="input-edit"
                  value={temp.routes}
                  onChange={(e) => handleChange("routes", e.target.value)}
                />
              )}
            </div>

            {/* Driver's License */}
            <div className="doc-card">
              <p>Driver’s License</p>
              <img
                src={driver.licenseImageUrl || defaultDoc}
                alt="License"
                className="doc-image"
              />
            </div>

            {/* OR / CR */}
            <div className="doc-card">
              <p>OR / CR</p>
              <img
                src={driver.orcrImageUrl || defaultDoc}
                alt="ORCR"
                className="doc-image"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfilePage;
