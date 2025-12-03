import React, { useState } from "react";
import {
  Home,
  CalendarDays,
  Car,
  Info,
  Upload,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [routeFrom, setRouteFrom] = useState("");
  const [routeTo, setRouteTo] = useState("");
  const [loading, setLoading] = useState(false);

  const locations = [
    "Ligao",
    "Oas",
    "Daraga",
    "Legazpi",
    "Pilar",
    "Camalig",
    "Polangui",
  ];

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ FIX: backend expects "routes", not currentLocation/destination
      const payload = {
        role: "driver",
        fullName,
        email,
        password,
        birthday,
        address,
        contactNumber,
        vehicleType,
        routes: `${routeFrom} → ${routeTo}`, // ⭐ FINAL FIX
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("Registered successfully!");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">
      
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/schedule" className="nav-link">Schedule</Link>
          <span className="nav-link active">Login</span>
          <Link to="/about" className="nav-link">About Us</Link>
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
            
            {/* PROFILE UPLOAD BOX */}
            <div className="profile-section">
              <div className="profile-circle"></div>
              <label htmlFor="profileUpload" className="upload-picture-label">
                Upload Picture
              </label>
              <input type="file" id="profileUpload" hidden />
            </div>

            {/* REGISTRATION FORM */}
            <form className="register-form" onSubmit={handleRegister}>
              <div className="form-grid">

                {/* Full Name */}
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Birthday */}
                <div className="input-group">
                  <label>Birthday</label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Address */}
                <div className="input-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* Contact Number */}
                <div className="input-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>

                {/* Vehicle Type */}
                <div className="input-group">
                  <label>Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="bus">Bus</option>
                    <option value="van">Van</option>
                    <option value="jeep">Jeep</option>
                  </select>
                </div>

                {/* ROUTES */}
                <div className="input-group routes-group">
                  <label>Routes</label>

                  <div className="routes-row">
                    {/* FROM */}
                    <select
                      value={routeFrom}
                      onChange={(e) => {
                        setRouteFrom(e.target.value);
                        if (routeTo === e.target.value) setRouteTo("");
                      }}
                      required
                    >
                      <option value="">From</option>
                      {locations
                        .filter((loc) => loc !== routeTo)
                        .map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                    </select>

                    <ArrowRight className="route-arrow" size={20} />

                    {/* TO */}
                    <select
                      value={routeTo}
                      onChange={(e) => {
                        setRouteTo(e.target.value);
                        if (routeFrom === e.target.value) setRouteFrom("");
                      }}
                      required
                    >
                      <option value="">To</option>
                      {locations
                        .filter((loc) => loc !== routeFrom)
                        .map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* LICENSE + OR/CR UPLOAD */}
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

              </div>

              {/* SUBMIT BUTTON */}
              <button className="register-btn" type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>

            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
