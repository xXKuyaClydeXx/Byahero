import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/PassengerPage.css";

// Import your local images
import BGbusInside from "../assets/images/BG-busInside.jpg";
import VehicleBus from "../assets/images/Vehicle-bus.jpg";
import VehicleJeepney from "../assets/images/Vehicle-jeepney.jpg";
import VehicleVan from "../assets/images/Vehicle-van.jpg";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";


// Import icons from react-icons
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const PassengerPage = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/schedule");
  };

  return (
    <div className="passenger-page">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
        </div>

        <div className="nav-icons">
          <button className="icon active" aria-label="Home">
            <Home />
          </button>
          <Link to="/schedule" className="icon" aria-label="Schedule">
            <CalendarDays />
          </Link>
          <Link to="/login" className="icon" aria-label="Driver">
            <Car />
          </Link>
          <Link to="/about" className="icon" aria-label="Info">
            <Info />
          </Link>
        </div>
      </nav>

      {/* HERO BACKGROUND SECTION (IMAGE READABILITY FIXED) */}
      <section className="hero-section">
        <div className="hero-text">
          <div className="overlay"> {/* ADDED FOR READABILITY */}
            <h2>
              Check your route, plan your trip
              <span className="highlight-line"> — all online.</span>
            </h2>
            <p>Easily check if there's a trip available to your destination.</p>
          </div>
        </div>
      </section>

      {/* SEARCH SECTION (OVERLAPPING THE HERO SECTION) */}
      <section className="search-section">
        <form className="search-box" onSubmit={handleSearch}>
          <div className="search-grid">
            <div className="input-group">
              <label htmlFor="from">From</label>
              <input type="text" id="from" placeholder="Current Destination" />
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

      {/* VEHICLE SECTION */}
      <section className="vehicle-section">
        <h3 className="vehicle-title">Vehicle</h3>
        <div className="vehicle-gallery">
          {[VehicleBus, VehicleJeepney, VehicleVan].map((img, i) => (
            <img
              key={i}
              src={img}
              alt="vehicle"
              className="vehicle-card"
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <p>About us</p>
            <p>Customer Support</p>
            <p>Terms & Condition</p>
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
    </div>
  );
};

export default PassengerPage;