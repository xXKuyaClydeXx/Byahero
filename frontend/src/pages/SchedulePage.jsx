import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const searchFrom = query.get("from") || "";
  const searchTo = query.get("to") || "";
  const searchVehicle = query.get("vehicle") || "";

  useEffect(() => {
    fetchSchedules();

    if (searchVehicle) {
      const formatted = searchVehicle.charAt(0).toUpperCase() + searchVehicle.slice(1);
      setActiveTab(formatted);
    }
  }, [searchVehicle]);

  // FINAL WORKING FILTER LOGIC
  const filteredData = schedules.filter((row) => {
    const rowVehicle = row.vehicle.toLowerCase(); // stored vehicle
    const tabVehicle = activeTab.toLowerCase();   // tab filter: van, bus, jeep

    const matchesTab = rowVehicle === tabVehicle;

    const matchesSearchVehicle = searchVehicle
      ? rowVehicle === searchVehicle.toLowerCase()
      : true;

    const matchesFrom = searchFrom
      ? row.from.toLowerCase().includes(searchFrom.toLowerCase())
      : true;

    const matchesTo = searchTo
      ? row.to.toLowerCase().includes(searchTo.toLowerCase())
      : true;

    return matchesTab && matchesSearchVehicle && matchesFrom && matchesTo;
  });

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
      
      {/* NAVBAR */}
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

      {/* MAIN CONTENT */}
      <section className="schedule-section">
        <div className="schedule-card">

          {/* VEHICLE TABS */}
          <div className="vehicle-tabs inside">
            {["Van", "Bus", "Jeep"].map((type) => (
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

          {/* SCHEDULE TABLE */}
          <div className="table-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Driver</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Vehicle</th>
                  <th>Departure</th>
                  <th>Seats</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No schedules available for {activeTab}.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.driver?.fullName || "Unknown"}</td>
                      <td>{row.from}</td>
                      <td>{row.to}</td>
                      <td>{row.vehicle.charAt(0).toUpperCase() + row.vehicle.slice(1)}</td>
                      <td>{formatTime12(row.departureTime)}</td>
                      <td>{row.seats}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* FOOTER */}
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
            <button onClick={() => setShowSupport(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SchedulePage;