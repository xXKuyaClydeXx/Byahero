// src/pages/DriverProfilePage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, CalendarDays, Car, Edit3, Save, X, Star, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Make sure your firebase.js exports 'auth'

import "../css/DriverProfilePage.css";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";

const DriverProfilePage = () => {
  const navigate = useNavigate();

  // =========================
  //  DRIVER DATA (dynamic)
  // =========================
  const [driver, setDriver] = useState({
    name: "Juan Dela Cruz",
    rating: 5.0,
    reviews: "1.2k",
    joined: "March 2018",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219970.png",
    performance: 50,
    rewards: 128,
    minPerformance: 25,
    avgPerformance: 73,
    trips: { total: 952, completed: 831, canceled: 21 },
    earnings: { total: 1254, target: 2510, distance: 12, time: 125 },
  });

  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(driver);

  // =========================
  //  HANDLERS
  // =========================
  const handleChange = (section, key, value) => {
    if (!section) {
      setTemp({ ...temp, [key]: value });
    } else {
      setTemp({
        ...temp,
        [section]: {
          ...temp[section],
          [key]: value,
        },
      });
    }
  };

  const handleSave = () => {
    setDriver(temp);
    setEditing(false);
  };

  const handleCancel = () => {
    setTemp(driver);
    setEditing(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setTemp({ ...temp, avatar: url });
  };

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      await signOut(auth); // Properly sign out the Firebase user
      navigate("/login");  // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="driver-profile-page">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/driverschedule" className="nav-link">Schedule</Link>
          <span className="nav-link active">Profile</span>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* ===== EDIT MODE BUTTONS ===== */}
      <div style={{ width: "100%", maxWidth: "1000px", margin: "20px auto", textAlign: "right" }}>
        {!editing ? (
          <button className="edit-btn" onClick={() => setEditing(true)}>
            <Edit3 size={16} /> Edit Profile
          </button>
        ) : (
          <>
            <button
              className="edit-btn"
              style={{ marginRight: "10px", background: "#22c55e" }}
              onClick={handleSave}
            >
              <Save size={16} /> Save
            </button>
            <button
              className="edit-btn"
              style={{ background: "#ef4444" }}
              onClick={handleCancel}
            >
              <X size={16} /> Cancel
            </button>
          </>
        )}
      </div>

      {/* ===== PROFILE CARD ===== */}
      <section className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              <img src={temp.avatar} alt="Driver" className="profile-avatar" />
              {editing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{
                    position: "absolute",
                    bottom: "-10px",
                    left: "0",
                    width: "120px",
                  }}
                />
              )}
            </div>

            {/* Profile Info */}
            <div className="profile-info">
              {!editing ? (
                <h2>{driver.name}</h2>
              ) : (
                <input
                  type="text"
                  value={temp.name}
                  onChange={(e) => handleChange(null, "name", e.target.value)}
                  className="input-edit"
                />
              )}

              <div className="rating">
                <Star className="star-icon" />
                {!editing ? (
                  <span>{driver.rating} • {driver.reviews} Reviews</span>
                ) : (
                  <span>
                    <input
                      type="number"
                      value={temp.rating}
                      min="0"
                      max="5"
                      step="0.1"
                      onChange={(e) => handleChange(null, "rating", e.target.value)}
                      className="input-small"
                    />{" "}
                    •{" "}
                    <input
                      type="text"
                      value={temp.reviews}
                      onChange={(e) => handleChange(null, "reviews", e.target.value)}
                      className="input-small"
                    />{" "}
                    Reviews
                  </span>
                )}
              </div>

              {!editing ? (
                <p className="join-date">Joined {driver.joined}</p>
              ) : (
                <input
                  type="text"
                  value={temp.joined}
                  onChange={(e) => handleChange(null, "joined", e.target.value)}
                  className="input-edit"
                />
              )}
            </div>
          </div>

          {/* ===== PERFORMANCE ===== */}
          <div className="stats-grid">
            {[
              { label: "Performance", key: "performance" },
              { label: "Reward Point", key: "rewards" },
              { label: "Min. Performance", key: "minPerformance", suffix: "%" },
              { label: "Avg. Performance", key: "avgPerformance", suffix: "%" },
            ].map((item, idx) => (
              <div className="stat-card" key={idx}>
                <p>{item.label}</p>
                {!editing ? (
                  <h3>{driver[item.key]}{item.suffix || ""}</h3>
                ) : (
                  <input
                    type="number"
                    value={temp[item.key]}
                    onChange={(e) => handleChange(null, item.key, e.target.value)}
                    className="input-number"
                  />
                )}
              </div>
            ))}
          </div>

          {/* ===== TRIP STATS ===== */}
          <div className="trip-stats">
            {[
              { label: "Total Trips", key: "total" },
              { label: "Completed", key: "completed" },
              { label: "Canceled", key: "canceled" },
            ].map((stat, i) => (
              <div key={i}>
                <p>{stat.label}</p>
                {!editing ? (
                  <h3>{driver.trips[stat.key]}</h3>
                ) : (
                  <input
                    type="number"
                    value={temp.trips[stat.key]}
                    onChange={(e) => handleChange("trips", stat.key, e.target.value)}
                    className="input-number"
                  />
                )}
              </div>
            ))}
          </div>

          {/* ===== EARNINGS ===== */}
          <div className="earnings-section">
            {[
              { label: "Total Earning", key: "total", prefix: "$", color: "green" },
              { label: "Target Earning", key: "target", prefix: "$", color: "red" },
              { label: "Total Distance", key: "distance", suffix: "km" },
              { label: "Total Time", key: "time", suffix: "m" },
            ].map((item, i) => (
              <div key={i}>
                <p>{item.label}</p>
                {!editing ? (
                  <h3 className={item.color || ""}>{item.prefix || ""}{driver.earnings[item.key]}{item.suffix || ""}</h3>
                ) : (
                  <input
                    type="number"
                    value={temp.earnings[item.key]}
                    onChange={(e) => handleChange("earnings", item.key, e.target.value)}
                    className="input-number"
                  />
                )}
              </div>
            ))}
          </div>

          {/* ===== CHART ===== */}
          <div className="chart-section">
            <h3>Statistics</h3>
            <p>Avg. Performance</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${temp.avgPerformance || 0}%` }}></div>
            </div>
            <p className="progress-text">{temp.avgPerformance}%</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverProfilePage;
