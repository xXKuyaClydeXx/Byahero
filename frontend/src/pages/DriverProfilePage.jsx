import React, { useEffect, useState } from "react";
import { Edit3, Save, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/DriverProfilePage.css";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";

const DriverProfilePage = () => {
  const [driver, setDriver] = useState(null);
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(null);

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
      .catch(() => {});
  }, []);

  if (!driver)
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading profile...</p>;

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return date;
    }
  };

  const handleChange = (key, value) => {
    setTemp({ ...temp, [key]: value });
  };

  // TEMPORARY IMAGE PREVIEW ONLY
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file); // TEMPORARY ONLY
    setTemp({ ...temp, profileImageUrl: url });
  };

  // FINAL SAVE — DB UPDATE (Option C)
  const handleSave = () => {
    const token = localStorage.getItem("token");

    // Only send fields that actually exist in DB
    const dataToSend = {
      fullName: temp.fullName,
      contactNumber: temp.contactNumber,
      vehicleType: temp.vehicleType,
      routes: temp.routes,
      birthday: temp.birthday,
      address: temp.address
    };

    axios
      .put("http://localhost:5000/api/auth/update", dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDriver(res.data.user);
        setEditing(false);
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile.");
      });
  };

  const handleCancel = () => {
    setTemp(driver);
    setEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  return (
    <div className="driver-profile-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} className="nav-logo" alt="logo" />
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

      {/* PROFILE CARD */}
      <section className="profile-container">
        <div className="profile-card">

          {/* HEADER */}
          <div className="profile-header-modern">
            <img
              src={temp.profileImageUrl}
              className="profile-avatar-modern"
              alt="Driver"
            />

            {/* Upload Button (Temporary Only) */}
            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ marginTop: "10px" }}
              />
            )}

            <div className="profile-info-modern">
              {!editing ? (
                <h2 className="profile-name">{driver.fullName}</h2>
              ) : (
                <input
                  type="text"
                  value={temp.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="input-edit"
                />
              )}

              <p className="profile-sub">{driver.email}</p>

              {!editing ? (
                <p className="profile-sub">Contact: {driver.contactNumber}</p>
              ) : (
                <input
                  type="text"
                  value={temp.contactNumber}
                  onChange={(e) => handleChange("contactNumber", e.target.value)}
                  className="input-edit"
                />
              )}

              <p className="profile-sub">Joined: {formatDate(driver.birthday)}</p>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="stats-grid">
            <div className="stat-card">
              <p>Vehicle Type</p>
              {!editing ? (
                <h3>{driver.vehicleType}</h3>
              ) : (
                <input
                  type="text"
                  value={temp.vehicleType}
                  onChange={(e) => handleChange("vehicleType", e.target.value)}
                  className="input-edit"
                />
              )}
            </div>

            <div className="stat-card">
              <p>Route</p>
              {!editing ? (
                <h3>{driver.routes}</h3>
              ) : (
                <input
                  type="text"
                  value={temp.routes}
                  onChange={(e) => handleChange("routes", e.target.value)}
                  className="input-edit"
                />
              )}
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="documents-wrapper">
            <div className="doc-card">
              <p>License Image</p>
              <img src={driver.licenseImageUrl} className="doc-image" alt="License" />
            </div>

            <div className="doc-card">
              <p>OR/CR Image</p>
              <img src={driver.orcrImageUrl} className="doc-image" alt="ORCR" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DriverProfilePage;