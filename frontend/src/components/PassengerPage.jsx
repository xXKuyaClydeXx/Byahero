import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/PassengerPage.css";

const PassengerPage = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/schedule");
  };

  return (
    <div className="passenger-page">
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-icons">
          <button className="icon active" aria-label="Home"><Home /></button>
          <Link to="/schedule" className="icon" aria-label="Schedule"><CalendarDays /></Link>
          <Link to="/login" className="icon" aria-label="Driver"><Car /></Link>
          <Link to="/about" className="icon" aria-label="Info"><Info /></Link>
        </div>
      </nav>

      <section className="search-section">
        <div className="search-box">
          <div className="search-grid">
            <div className="input-group">
              <label>From</label>
              <input type="text" placeholder="Current Destination" />
            </div>

            <div className="input-group">
              <label>To</label>
              <input type="text" placeholder="Current Destination" />
            </div>

            <div className="input-group">
              <label>Vehicle</label>
              <select defaultValue="" className="vehicle-select">
                <option value="" disabled>Select Vehicle Type</option>
                <option value="bus">Bus</option>
                <option value="van">Van</option>
              </select>
            </div>

            <div className="action-cell">
              <button className="search-btn" onClick={handleSearch}>SEARCH</button>
            </div>
          </div>
        </div>
      </section>

      <div className="results-area"></div>
    </div>
  );
};

export default PassengerPage;