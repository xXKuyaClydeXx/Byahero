import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/PassengerPage.css";

// Import your local images
import BGbusInside from "../assets/images/BG-busInside.jpg";
import VehicleBus from "../assets/images/Vehicle-bus.jpg";
import VehicleJeepney from "../assets/images/Vehicle-jeepney.jpg";
import VehicleVan from "../assets/images/Vehicle-van.jpg";

const PassengerPage = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/schedule");
  };

  return (
    <div className="passenger-page">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
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

      {/* HERO BACKGROUND SECTION */}
      <section className="hero-section">
        <div className="hero-text">
          <h2>
            Check your route, plan your trip
            <span className="highlight-line"> — all online.</span>
          </h2>
          <p>Easily check if there's a trip available to your destination.</p>
        </div>
      </section>

      {/* SEARCH SECTION */}
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
              <input type="text" id="vehicle" placeholder="Vehicle Type" />
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
        <footer className="footer">
          <div className="footer-column">
            <p>About Us</p>
            <p>Customer Privacy</p>
            <p>Customer Support</p>
          </div>
          <div className="footer-column">
            <p>Vehicle Available</p>
            <p>Trip Schedule</p>
            <p>Terms & Conditions</p>
          </div>
        </footer>

        <div className="footer-social">
          <div className="icons">
            <a href="#">📘</a>
            <a href="#">🐦</a>
            <a href="#">📸</a>
          </div>
          <a href="#" className="privacy-link">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default PassengerPage;
