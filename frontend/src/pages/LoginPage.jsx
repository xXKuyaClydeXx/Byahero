import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      navigate("/driverprofile");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="login-page">

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-header">
          <h1 className="title">BYAHERO TERMINAL</h1>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/schedule" className="nav-link">Schedule</Link>
          <span className="nav-link active">Login</span>
          <Link to="/about" className="nav-link">About Us</Link>
        </div>
      </nav>

      {/* ===== LOGIN SECTION ===== */}
      <section className="login-section">
        <div className="login-box">
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="vaprams@gbox.adnu.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <a href="#" className="forgot">Forgot password?</a>

            <button type="submit" className="signin-btn">Sign in</button>

            <p className="create-account">
              Don’t have an account?{" "}
              <Link to="/register" className="create-link">Create Account</Link>
            </p>
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <p
              onClick={() => navigate("/about")}
              style={{ cursor: "pointer" }}
            >
              About Us
            </p>
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
