import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (code && password) {
      navigate("/driverprofile");
    } else {
      alert("Please enter code and password");
    }
  };

  return (
    <div className="login-page">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/schedule" className="nav-link">
            Schedule
          </Link>
          <span className="nav-link active">Login</span>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
        </div>
      </nav>

      {/* ===== LOGIN SECTION ===== */}
      <section className="login-section">
        <div className="login-box">
          <form onSubmit={handleLogin}>           

            <label>Code</label>
            <input
              type="code"
              placeholder="Enter 6 digits code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="signin-btn">
              Confirm
            </button>

            <p className="create-account">
              Have an account?{" "}
              <Link to="/login" className="create-link">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <p onClick={() => navigate("/about")} style={{ cursor: "pointer" }}>
              About Us
            </p>
            <p
              onClick={() => setShowSupport(true)}
              style={{ cursor: "pointer" }}
            >
              Customer Support
            </p>
            <p onClick={() => setShowTerms(true)} style={{ cursor: "pointer" }}>
              Terms & Condition
            </p>
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
          <a href="#" className="privacy-link">
            Privacy Policy
          </a>
        </div>
      </footer>

      {/* MODALS */}
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}

      {showSupport && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CustomerSupport />
            <button onClick={() => setShowSupport(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
