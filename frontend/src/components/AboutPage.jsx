import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-icons">
          <Link to="/" className="icon" aria-label="Home"><Home /></Link>
          <Link to="/schedule" className="icon" aria-label="Schedule"><CalendarDays /></Link>
          <Link to="/login" className="icon" aria-label="Driver"><Car /></Link>
          <button className="icon active" aria-label="about"><Info /></button>
        </div>
      </nav>

      <section className="about-section">
        <div className="about-card">
          <h2 className="about-heading">About us</h2>
          <p className="about-text">alaws pa ma construct na essay</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;