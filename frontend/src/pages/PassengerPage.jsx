import React, { useState } from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/PassengerPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import BGbusInside from "../assets/images/BG-busInside.jpg";
import VehicleBus from "../assets/images/Vehicle-bus.jpg";
import VehicleJeepney from "../assets/images/Vehicle-jeepney.jpg";
import VehicleVan from "../assets/images/Vehicle-van.jpg";

import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";
import PrivacyPolicy from "./Policy"; // ✅ IMPORT PRIVACY POLICY COMPONENT

const PassengerPage = () => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false); // ✅ PRIVACY MODAL STATE

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/schedule");
  };

  return (
    <div className="passenger-page">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-links">
          <span className="nav-link active">Home</span>
          <Link to="/schedule" className="nav-link">
            Schedule
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-text">
          <div className="overlay">
            <h2>
              Check your route, plan your trip
              <span className="highlight-line"> — all online.</span>
            </h2>
            <p>Easily check if there's a trip available to your destination.</p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-section">
        <form className="search-box" onSubmit={handleSearch}>
          <div className="search-grid">
            <div className="input-group">
              <label htmlFor="from">From</label>
              <input type="text" id="from" placeholder="Current Location" />
            </div>

            <div className="input-group">
              <label htmlFor="to">To</label>
              <input type="text" id="to" placeholder="Destination" />
            </div>

            <div className="input-group">
              <label htmlFor="vehicle">Vehicle</label>
              <select id="vehicle" className="vehicle-select" defaultValue="">
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="bus">Bus</option>
                <option value="jeepney">Jeepney</option>
                <option value="van">Van</option>
              </select>
            </div>

            <div className="action-cell">
              <button type="submit" className="search-btn">
                SEARCH
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* VEHICLES */}
      <section className="vehicle-section">
        <h3 className="vehicle-title">Vehicle</h3>
        <div className="vehicle-gallery">
          {[VehicleBus, VehicleJeepney, VehicleVan].map((img, i) => (
            <img key={i} src={img} alt="vehicle" className="vehicle-card" />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <p
              onClick={() => navigate("/about")}
              style={{ cursor: "pointer" }}
            >
              About Us
            </p>
            <p
              onClick={() => setShowSupport(true)}
              style={{ cursor: "pointer" }}
            >
              Customer Support
            </p>
            <p onClick={() => setShowTerms(true)} style={{ cursor: "pointer" }}>
              Terms & Condition
            </p>
          </div>
          <div>
            <p>Vehicle Available</p>
            <p>Trip Schedule</p>
          </div>
        </div>

        <div className="footer-social">
          <div className="icons">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
          </div>
          {/* ✅ OPEN PRIVACY POLICY */}
          <p
            onClick={() => setShowPrivacy(true)}
            className="privacy-link"
            style={{ cursor: "pointer" }}
          >
            Privacy Policy
          </p>
        </div>
      </footer>

      {/* MODALS */}
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

      {/* ✅ PRIVACY POLICY MODAL */}
      {showPrivacy && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PrivacyPolicy />
            <button onClick={() => setShowPrivacy(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerPage;
