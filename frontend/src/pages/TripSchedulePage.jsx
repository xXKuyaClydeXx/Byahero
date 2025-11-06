import React, { useState } from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../css/TripSchedulePage.css";

import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";

const TripSchedulePage = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="trip-schedule-page">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-icons">
          <Link to="/" className="icon" aria-label="Home">
            <Home />
          </Link>
          <button className="icon active" aria-label="Schedule">
            <CalendarDays />
          </button>
          <Link to="/login" className="icon" aria-label="Driver">
            <Car />
          </Link>
          <Link to="/about" className="icon" aria-label="Info">
            <Info />
          </Link>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="overlay">
          <h2>Manage Your Trip Schedule</h2>
          <p>Add or view upcoming trips for buses, vans, and jeepneys</p>
        </div>
      </section>

      {/* ===== ADD TRIP SECTION ===== */}
      <section className="search-section">
        <div className="search-box">
          <div className="search-grid">

            <div className="input-group">
              <label>From</label>
              <input type="text" placeholder="Enter origin" />
            </div>

            <div className="input-group">
              <label>To</label>
              <input type="text" placeholder="Enter destination" />
            </div>

            <div className="input-group">
              <label>Vehicle</label>
              <select className="vehicle-select">
                <option value="">Select vehicle</option>
                <option value="van">Van</option>
                <option value="bus">Bus</option>
                <option value="jeep">Jeep</option>
              </select>
            </div>

            <div className="input-group">
              <label>Terminal</label>
              <input type="text" placeholder="Enter terminal" />
            </div>

            <div className="input-group">
              <label>Time of Departure</label>
              <input type="time" />
            </div>

            <div className="input-group">
              <label>Available Seat</label>
              <input type="number" placeholder="Enter number of seats" />
            </div>

            <div className="action-cell">
              <button className="search-btn">Add Trip</button>
            </div>

          </div>
        </div>
      </section>

      {/* ===== TRIP RESULTS ===== */}
      <section className="schedule-results">
        <h3>Available Trips</h3>
        <div className="trip-cards">

          <div className="trip-card">
            <h4>Bus - Naga to Legazpi</h4>
            <p>Terminal: Naga Central Terminal</p>
            <p>Time of Departure: 8:00 AM</p>
            <p>Available Seats: 30</p>
          </div>

          <div className="trip-card">
            <h4>Van - Naga to Pili</h4>
            <p>Terminal: CBD Terminal</p>
            <p>Time of Departure: 9:30 AM</p>
            <p>Available Seats: 12</p>
          </div>

        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <p>About us</p>
            <p onClick={() => setShowSupport(true)} style={{ cursor: "pointer" }}>Customer Support</p>
            <p onClick={() => setShowTerms(true)} style={{ cursor: "pointer" }}>Terms & Condition</p>
          </div>
          <div>
            <p>Vehicle Available</p>
            <p>Trip Schedule</p>
          </div>
        </div>

        <div className="footer-social">
          <div className="icons">
            <a href="#" aria-label="Facebook" className="social-link">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter" className="social-link">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="social-link">
              <FaInstagram />
            </a>
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

export default TripSchedulePage;
