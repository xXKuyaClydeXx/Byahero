import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/AboutPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";

const teamMembers = [
  { name: "Clyde Arizala", role: "Tech Lead, Full Stack Developer", initials: "CA" },
  { name: "Karie Magalona", role: "UI/UX Designer", initials: "KM" },
  { name: "Marjun Mapa", role: "Frontend Developer", initials: "MM" },
  { name: "Vaugn Pramis", role: "Frontend Developer", initials: "VP" },
];

const AboutPage = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="about-page">

      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/schedule" className="nav-link">Schedule</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <span className="nav-link active">About Us</span>
        </div>
      </nav>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-card">
          <h2 className="about-heading">About Us</h2>

          <div className="about-text">
            <p>
              Welcome to <strong>Byahero</strong> — your modern travel companion built for local commuters and travelers.
              We’re a team of passionate IT students from <strong>Ateneo de Naga University – College of Computer Studies</strong> 
              who believe that traveling across the region shouldn’t be stressful or uncertain.
            </p>

            <h3>Our Mission</h3>
            <p>
              To bridge the gap between passengers and operators through a digital platform that simplifies booking,
              enhances accessibility, and brings convenience to everyday travel.
            </p>

            <h3>Our Vision</h3>
            <p>
              We envision a future where every commuter can book bus or van trips with ease — 
              no more long lines, guesswork, or missed schedules. Just smooth, smart, and reliable travel.
            </p>

            <h3>Why Choose Byahero?</h3>
            <p>
              <strong>Byahero</strong> focuses on local and regional routes often overlooked by large platforms.
              With real-time seat updates, transparent schedules, and an easy-to-use interface,
              we’re bringing digital transformation to local transportation — one trip at a time.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section">
        <h2 className="team-heading">MEET THE TEAM</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="avatar">{member.initials}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-column">
          <p>About Us</p>
          <p onClick={() => setShowSupport(true)} style={{ cursor: "pointer" }}>Customer Support</p>
          <p onClick={() => setShowTerms(true)} style={{ cursor: "pointer" }}>Terms & Condition</p>
        </div>

        <div className="footer-column">
          <p>Vehicle Available</p>
          <p>Trip Schedule</p>
        </div>

        <div className="footer-social">
          <div className="icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
          <a href="#" className="privacy-link">Privacy Policy</a>
        </div>
      </footer>

      {/* MODALS */}
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

export default AboutPage;
