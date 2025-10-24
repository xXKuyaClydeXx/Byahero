import React from "react";
import { Home, CalendarDays, Car, Info, Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/RegisterPage.css";

const RegisterPage = () => {
  return (
    <div className="register-page">
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

      <section className="register-section">
        <div className="register-card">
          <div className="register-header">
            <Link to="/login" className="back-btn">
              <ArrowLeft size={18} /> Back
            </Link>
            <h3 className="register-heading">REGISTER</h3>
          </div>

          <div className="register-layout">
            <div className="profile-section">
              <div className="profile-circle"></div>
              <label htmlFor="profileUpload" className="upload-picture-label">
                Upload Picture
              </label>
              <input type="file" id="profileUpload" hidden />
            </div>

            <form className="register-form">
              <div className="form-grid">
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Input" />
                </div>

                <div className="input-group">
                  <label>Birthday</label>
                  <input type="date" placeholder="mm/dd/yyyy" />
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input type="password" placeholder="######" />
                </div>

                <div className="input-group">
                  <label>Address</label>
                  <input type="text" placeholder="P. Santos, Naga City" />
                </div>

                <div className="upload-row">
                  <div className="input-group upload-group">
                    <label>Driver’s License</label>
                    <div className="upload-box">
                      <input type="file" id="licenseUpload" hidden />
                      <label htmlFor="licenseUpload" className="upload-label">
                        UPLOAD IMAGE <Upload size={16} />
                      </label>
                    </div>
                  </div>

                  <div className="input-group upload-group">
                    <label>OR/CR</label>
                    <div className="upload-box">
                      <input type="file" id="orcrUpload" hidden />
                      <label htmlFor="orcrUpload" className="upload-label">
                        UPLOAD IMAGE <Upload size={16} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Contact Number</label>
                  <input type="text" placeholder="63+ XXXXXXXXXX" />
                </div>

                <div className="input-group">
                  <label>Vehicle Type</label>
                  <input type="text" placeholder="PXXX" />
                </div>

                <div className="input-group">
                  <label>Routes</label>
                  <input type="text" placeholder="PXXX" />
                </div>
              </div>

              <button className="register-btn">Register</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;