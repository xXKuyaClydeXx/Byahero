import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/SchedulePage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";
import { SchedulesContext } from "../context/SchedulesContext";

const SchedulePage = () => {
  const [activeTab, setActiveTab] = useState("Van");
  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const { schedules, fetchSchedules } = useContext(SchedulesContext);

  // Fetch schedules on mount
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const filteredData = schedules.filter(row => row.vehicle === activeTab);

  const formatTime12 = (time24) => {
    if (!time24) return "";
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <div className="schedule-page">
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <span className="nav-item active">Schedule</span>
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/about" className="nav-item">About Us</Link>
        </div>
      </nav>

      <section className="schedule-section">
        <div className="schedule-card">
          <div className="vehicle-tabs inside">
            {["Van", "Bus", "Jeepney"].map(type => (
              <button key={type} className={`tab-btn ${activeTab === type ? "active" : ""}`} onClick={() => setActiveTab(type)}>
                {type}
              </button>
            ))}
          </div>

          <h2 className="schedule-heading">{activeTab}</h2>

          <div className="table-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>DRIVER'S NAME</th>
                  <th>VEHICLE TYPE</th>
                  <th>AVAILABLE SEAT</th>
                  <th>TERMINAL</th>
                  <th>TIME OF DEPARTURE</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No schedules available for {activeTab}.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.driver?.name || "Unknown"}</td>
                      <td>{row.vehicle}</td>
                      <td>{row.seats}</td>
                      <td>{row.terminal || row.from}</td>
                      <td>{formatTime12(row.departureTime)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <div>
            <p style={{ cursor: "pointer" }}>About Us</p>
            <p onClick={() => setShowSupport(true)}>Customer Support</p>
            <p onClick={() => setShowTerms(true)}>Terms & Condition</p>
          </div>
          <div>
            <p>Vehicle Available</p>
            <p>Trip Schedule</p>
          </div>
        </div>
        <div className="footer-social">
          <div className="icons">
            <a href="#" className="social-link"><FaFacebook /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
          </div>
          <a href="#" className="privacy-link">Privacy Policy</a>
        </div>
      </footer>

      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
      {showSupport && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CustomerSupport />
            <button onClick={() => setShowSupport(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;