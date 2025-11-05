import React, { useState } from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/SchedulePage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const SchedulePage = () => {
  const [activeTab, setActiveTab] = useState("Van");

  const scheduleData = [
    { driver: "Vaugn Ashton", vehicle: "Van", seats: 10, terminal: "Cubao", departure: "8:00 AM" },
    { driver: "Klayd Dranreb", vehicle: "Bus", seats: 30, terminal: "Pasay", departure: "9:15 AM" },
    { driver: "Marjun Mapa", vehicle: "Jeepney", seats: 8, terminal: "Caloocan", departure: "10:00 AM" },
  ];

  const filteredData = scheduleData.filter((row) => row.vehicle === activeTab);

  return (
    <div className="schedule-page">
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-icons">
          <Link to="/" className="icon" aria-label="Home"><Home /></Link>
          <button className="icon active" aria-label="Schedule"><CalendarDays /></button>
          <Link to="/login" className="icon" aria-label="Login"><Car /></Link>
          <Link to="/about" className="icon" aria-label="About"><Info /></Link>
        </div>
      </nav>

      {/* VEHICLE TABS */}
      <section className="vehicle-tabs">
        {["Van", "Bus", "Jeepney"].map((type) => (
          <button
            key={type}
            className={`tab-btn ${activeTab === type ? "active" : ""}`}
            onClick={() => setActiveTab(type)}
          >
            <span>{type}</span>
          </button>
        ))}
      </section>

      {/* SCHEDULE TABLE */}
      <section className="schedule-section">
        <div className="schedule-card">
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
            <a href="#" aria-label="Facebook" className="social-link"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="social-link"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="social-link"><FaInstagram /></a>
          </div>
          <a href="#" className="privacy-link">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default SchedulePage;
