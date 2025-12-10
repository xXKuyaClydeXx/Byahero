import React, { useState, useEffect, useContext } from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../css/TripSchedulePage.css";

import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";
import PrivacyPolicy from "./Policy";

import API from "../api";
import { SchedulesContext } from "../context/SchedulesContext";

const TripSchedulePage = () => {
  const navigate = useNavigate();

  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // FORM STATES
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [terminal, setTerminal] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [seats, setSeats] = useState("");

  const { schedules, fetchSchedules } = useContext(SchedulesContext);

  useEffect(() => {
    fetchSchedules();
  }, []);

  // ===============================
  // ⭐ ADD TRIP (SCHEDULE)
  // ===============================
  const handleAddTrip = async () => {
    if (!from || !to || !vehicle || !terminal || !departureTime || !seats) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/api/schedules",
        {
          from,
          to,
          vehicle,
          terminal,
          departureTime,
          seats: Number(seats),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Trip added successfully!");
      fetchSchedules();

      setFrom("");
      setTo("");
      setVehicle("");
      setTerminal("");
      setDepartureTime("");
      setSeats("");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to add trip.");
    }
  };

  const formatTime12 = (time24) => {
    if (!time24) return "";
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <div className="trip-schedule-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
        </div>

        <div className="nav-icons">
          <Link to="/" className="icon"><Home /></Link>
          <button className="icon active"><CalendarDays /></button>
          <Link to="/login" className="icon"><Car /></Link>
          <Link to="/about" className="icon"><Info /></Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="overlay">
          <h2>Manage Your Trip Schedule</h2>
          <p>Add or view upcoming trips for buses, vans, and jeepneys</p>
        </div>
      </section>

      {/* ADD TRIP FORM */}
      <section className="search-section">
        <div className="search-box">
          <div className="search-grid">

            <div className="input-group">
              <label>From</label>
              <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Enter origin" />
            </div>

            <div className="input-group">
              <label>To</label>
              <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter destination" />
            </div>

            <div className="input-group">
              <label>Vehicle</label>
              <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                <option value="">Select vehicle</option>
                <option value="van">Van</option>
                <option value="bus">Bus</option>
                <option value="jeep">Jeep</option>
              </select>
            </div>

            <div className="input-group">
              <label>Terminal</label>
              <input value={terminal} onChange={(e) => setTerminal(e.target.value)} placeholder="Enter terminal" />
            </div>

            <div className="input-group">
              <label>Time of Departure</label>
              <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Available Seats</label>
              <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} placeholder="Seats" />
            </div>

            <div className="action-cell">
              <button className="search-btn" onClick={handleAddTrip}>Add Trip</button>
            </div>

          </div>
        </div>
      </section>

      {/* TRIP LIST (REAL DATA) */}
      <section className="schedule-results">
        <h3>Available Trips</h3>
        <div className="trip-cards">

          {schedules.length === 0 ? (
            <p>No trips available yet.</p>
          ) : (
            schedules.map((trip, i) => (
              <div key={i} className="trip-card">
                <h4>
                  {trip.vehicle.charAt(0).toUpperCase() + trip.vehicle.slice(1)} — {trip.from} to {trip.to}
                </h4>
                <p>Terminal: {trip.terminal}</p>
                <p>Time of Departure: {formatTime12(trip.departureTime)}</p>
                <p>Available Seats: {trip.seats}</p>
              </div>
            ))
          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <p onClick={() => navigate("/about")} style={{ cursor: "pointer" }}>About Us</p>
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
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}

      {showSupport && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CustomerSupport />
            <button className="close-btn" onClick={() => setShowSupport(false)}>Close</button>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PrivacyPolicy />
            <button className="close-btn" onClick={() => setShowPrivacy(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripSchedulePage;