import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport"; 


const LoginPage = () => {

  const [showTerms, setShowTerms] = React.useState(false);
  const [showSupport, setShowSupport] = React.useState(false);

  return (
    <div className="login-page">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-icons">
          <Link to="/" className="icon" aria-label="Home"><Home /></Link>
          <Link to="/schedule" className="icon" aria-label="Schedule"><CalendarDays /></Link>
          <button className="icon active" aria-label="Driver"><Car /></button>
          <Link to="/about" className="icon" aria-label="Info"><Info /></Link>
        </div>
      </nav>

      {/* ===== LOGIN SECTION ===== */}
      <section className="login-section">
        <div className="login-box">
          <form>
            <label>Email</label>
            <input type="email" placeholder="vaprams@gbox.adnu.edu.ph" />

            <label>Password</label>
            <input type="password" placeholder="********" />

            <a href="#" className="forgot">Forgot password?</a>

            <button type="submit" className="signin-btn">Sign in</button>

            <p className="create-account">
              Don’t have an account?{" "}
              <Link to="/register" className="create-link">Create Account</Link>
            </p>
          </form>
        </div>
      </section>

            {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <p>About us</p>
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
            <a href="#" aria-label="Facebook" className="social-link"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="social-link"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="social-link"><FaInstagram /></a>
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

export default LoginPage;
