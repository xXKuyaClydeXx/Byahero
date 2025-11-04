import React, { useState } from "react";
import { Home, CalendarDays, Car, Info, Upload, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";


const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("driver"); // or "operator"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [routes, setRoutes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    if (!fullName || !email || !password) {
      alert("Full name, email, and password are required.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        role,
        fullName,
        email,
        password,
        birthday: birthday || null,
        address,
        contactNumber,
        vehicleType,
        routes,
        profileImageUrl: "",
        licenseImageUrl: "",
        orcrImageUrl: ""
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      alert("Registered successfully, please sign in.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">
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

      <section className="register-section">
        <div className="register-card">
          <div className="register-header">
            <Link to="/login" className="back-btn"><ArrowLeft size={18} /> Back</Link>
            <h3 className="register-heading">REGISTER</h3>
          </div>

          <div className="register-layout">
            <div className="profile-section">
              <div className="profile-circle"></div>
              <label htmlFor="profileUpload" className="upload-picture-label">Upload Picture</label>
              <input type="file" id="profileUpload" hidden />
            </div>

            <form className="register-form" onSubmit={handleRegister}>
              <div className="form-grid">
                <div className="input-group">
                  <label>Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="driver">Driver</option>
                    <option value="operator">Operator</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Juan Dela Cruz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Birthday</label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="######"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="P. Santos, Naga City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
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
                  <input
                    type="text"
                    placeholder="639XXXXXXXXX"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Vehicle Type</label>
                  <input
                    type="text"
                    placeholder="van / bus"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Routes</label>
                  <input
                    type="text"
                    placeholder="Naga -> Legazpi"
                    value={routes}
                    onChange={(e) => setRoutes(e.target.value)}
                  />
                </div>
              </div>

              <button className="register-btn" type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
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

export default RegisterPage;