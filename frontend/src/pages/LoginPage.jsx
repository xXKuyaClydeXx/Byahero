import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
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

      <section className="login-section">
        <div className="login-box">
          <form>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="********" />

            <a href="#" className="forgot">Forgot password?</a>

            <div className="auth-buttons">
              <Link to="/register" className="primary-btn">Register</Link>
            </div>
          </form>
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

export default LoginPage;