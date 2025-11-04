import React from "react";
import { Home, CalendarDays, Car, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";



const LoginPage = () => {
  return (
    <div className="login-page">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
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

export default LoginPage;
