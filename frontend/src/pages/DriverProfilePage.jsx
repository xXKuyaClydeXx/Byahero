import React from "react";
import { Home, CalendarDays, Car, Info, Edit3, Star } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/DriverProfilePage.css";

const DriverProfilePage = () => {
  return (
    <div className="driver-profile-page">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-icons">
          <Link to="/" className="icon"><Home /></Link>
          <Link to="/schedule" className="icon"><CalendarDays /></Link>
          <button className="icon active"><Car /></button>
          <Link to="/about" className="icon"><Info /></Link>
        </div>
      </nav>

      {/* ===== PROFILE CARD ===== */}
      <section className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
              alt="Driver"
              className="profile-avatar"
            />
            <div className="profile-info">
              <h2>Juan Dela Cruz</h2>
              <div className="rating">
                <Star className="star-icon" />
                <span>5.0 • 1.2k Reviews</span>
              </div>
              <p className="join-date">Joined March 2018</p>
              <button className="edit-btn">
                <Edit3 size={16} /> Edit
              </button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="stats-grid">
            <div className="stat-card">
              <p>Performance</p>
              <h3>50</h3>
            </div>
            <div className="stat-card">
              <p>Reward Point</p>
              <h3>128</h3>
            </div>
            <div className="stat-card">
              <p>Min. Performance</p>
              <h3>25%</h3>
            </div>
            <div className="stat-card">
              <p>Avg. Performance</p>
              <h3>73%</h3>
            </div>
          </div>

          {/* Trip Statistics */}
          <div className="trip-stats">
            <div>
              <p>Total Trips</p>
              <h3>952</h3>
            </div>
            <div>
              <p>Completed</p>
              <h3>831</h3>
            </div>
            <div>
              <p>Canceled</p>
              <h3>21</h3>
            </div>
          </div>

          {/* Earnings Section */}
          <div className="earnings-section">
            <div>
              <p>Total Earning</p>
              <h3 className="green">$1254</h3>
            </div>
            <div>
              <p>Target Earning</p>
              <h3 className="red">$2510</h3>
            </div>
            <div>
              <p>Total Distance</p>
              <h3>12km</h3>
            </div>
            <div>
              <p>Total Time</p>
              <h3>125m</h3>
            </div>
          </div>

          {/* Statistics Chart Placeholder */}
          <div className="chart-section">
            <h3>Statistics</h3>
            <p>Avg. Performance</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "64%" }}></div>
            </div>
            <p className="progress-text">64%</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverProfilePage;
