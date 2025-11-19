import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/SchedulePage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";

const SchedulePage = () => {
  const [activeTab, setActiveTab] = useState("Van");
  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const scheduleData = [
    { driver: "Vaugn Ashton", vehicle: "Van", seats: 10, terminal: "Cubao", departure: "8:00 AM" },
    { driver: "Klayd Dranreb", vehicle: "Bus", seats: 30, terminal: "Pasay", departure: "9:15 AM" },
    { driver: "Marjun Mapa", vehicle: "Jeepney", seats: 8, terminal: "Caloocan", departure: "10:00 AM" },
  ];

  const filteredData = scheduleData.filter((row) => row.vehicle === activeTab);

  return (
    <div className="schedule-page">

      {/* ===== NAVBAR ===== */}
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


      {/* ===== TABLE + TABS IN ONE CARD ===== */}
      <section className="schedule-section">
        <div className="schedule-card">

          {/* ===== VEHICLE TABS INSIDE WHITE BOX ===== */}
          <div className="vehicle-tabs inside">
            {["Van", "Bus", "Jeepney"].map((type) => (
              <button
                key={type}
                className={`tab-btn ${activeTab === type ? "active" : ""}`}
                onClick={() => setActiveTab(type)}
              >
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
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.driver}</td>
                    <td>{row.vehicle}</td>
                    <td>{row.seats}</td>
                    <td>{row.terminal}</td>
                    <td>{row.departure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <p
              onClick={() => navigate("/about")}
              style={{ cursor: "pointer" }}
            >
              About Us
            </p>
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


      {/* ===== MODALS ===== */}
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
