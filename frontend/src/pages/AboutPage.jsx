import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/AboutPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";


const teamMembers = [
  { name: "Clyde Arizala", role: "Frontend Developer", initials: "CA" },
  { name: "Karie Magalona", role: "UI/UX Designer", initials: "KM" },
  { name: "Marjun Mapa", role: "Backend Developer", initials: "MM" },
  { name: "Vaugn Pramis", role: "Project Manager", initials: "VP" },
];

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
              Unlike other booking systems, <strong>Byahero</strong> focuses on local and regional routes that 
              are often overlooked by large platforms. With real-time seat updates, transparent schedules, 
              and a simple user interface, we’re bringing digital transformation to local transportation — 
              one trip at a time.
            </p>
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
