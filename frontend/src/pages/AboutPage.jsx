import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/AboutPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";

const teamMembers = [
  { name: "Clyde Arizala", role: "Tech Lead, Full Stack Developer", initials: "CA" },
  { name: "Karie Magalona", role: "UI/UX Designer", initials: "KM" },
  { name: "Marjun Mapa", role: "Frontend Developer", initials: "MM" },
  { name: "Vaugn Pramis", role: "Frontend Developer", initials: "VP" },
];

const AboutPage = () => {
  return (
    <div className="about-page">
      <nav className="navbar">
        <div className="nav-header">
          <div className="nav-header">
            <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
          </div>
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
          <h2 className="about-heading">ABOUT US</h2>
          <div className="about-text">
            <p>
              Welcome to <strong>Byahero</strong>, your trusted digital travel companion designed to make commuting across Bicol
              simpler, smarter, and more efficient. We are a team of IT students from
              <strong> Ateneo de Naga University – College of Computer Studies</strong>,
              driven by a shared goal to bring innovation to local transportation systems.
            </p>

            <div className="about-highlight">
              <h3>Our Mission</h3>
              <p>
                Our mission is to bridge the gap between passengers and transport operators
                through a reliable online platform that streamlines booking, improves accessibility,
                and promotes a more convenient travel experience for everyone.
              </p>
            </div>

            <div className="about-highlight">
              <h3>Our Vision</h3>
              <p>
                We envision a community where every commuter can reserve a seat with confidence and ease
                without the long queues, uncertainty, or last-minute rush.

                <strong>Byahero</strong> aims to redefine regional travel through technology and efficiency.
              </p>
            </div>

            <div className="about-highlight">
              <h3>Why Choose Byahero?</h3>
              <p>
                Unlike larger booking systems that focus on major routes, <strong>Byahero</strong> is built for
                local and regional travelers. Our platform provides real-time seat availability,
                accurate schedules, and a user-friendly interface empowering commuters and operators
                alike to experience a smoother, more connected journey.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Meet the Team Section */}
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

export default AboutPage;
