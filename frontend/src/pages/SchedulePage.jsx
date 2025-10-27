import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/SchedulePage.css";

const SchedulePage = () => {
  return (
    <div className="schedule-page">
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-icons">
          <Link to="/" className="icon" aria-label="Home"><Home /></Link>
          <button className="icon active" aria-label="Schedule"><CalendarDays /></button>
          <Link to="/login" className="icon" aria-label="/login"><Car /></Link>
          <Link to="/about" className="icon" aria-label="/about"><Info /></Link>
        </div>
      </nav>

      <section className="schedule-section">
        <div className="schedule-card">
          <h2 className="schedule-heading">SCHEDULE</h2>

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
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
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

export default SchedulePage;