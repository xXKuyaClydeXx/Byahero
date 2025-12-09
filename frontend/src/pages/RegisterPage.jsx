import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";

const RegisterPage = () => {
  const navigate = useNavigate();

  // TEXT FIELDS
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [routeFrom, setRouteFrom] = useState("");
  const [routeTo, setRouteTo] = useState("");

  // IMAGE STATES
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [licensePreview, setLicensePreview] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);

  const [orcrPreview, setOrcrPreview] = useState(null);
  const [orcrFile, setOrcrFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const locations = ["Ligao", "Oas", "Daraga", "Legazpi", "Pilar", "Camalig", "Polangui"];

  // =============================
  // IMAGE UPLOAD HANDLER (Cloudinary)
  // =============================
  const uploadImage = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload/image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url; // Cloudinary URL
  };

  // =============================
  // REGISTER USER
  // =============================
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images FIRST
      const profileImageUrl = await uploadImage(profileFile);
      const licenseImageUrl = await uploadImage(licenseFile);
      const orcrImageUrl = await uploadImage(orcrFile);

      // Prepare payload
      const payload = {
        role: "driver",
        fullName,
        email,
        password,
        birthday,
        address,
        contactNumber,
        vehicleType,
        routes: `${routeFrom} → ${routeTo}`,
        profileImageUrl,
        licenseImageUrl,
        orcrImageUrl,
      };

      const res = await fetch("http://localhost:5000/api/auth/register", {
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
  };

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

      {/* MAIN CARD */}
      <section className="register-section">
        <div className="register-card">

          {/* Header */}
          <div className="register-header">
            <Link to="/login" className="back-btn">
              <ArrowLeft size={18} /> Back
            </Link>
            <h3>REGISTER</h3>
          </div>

          <div className="register-layout">
            
            {/* PROFILE IMAGE */}
            <div className="profile-section">
              <div className="profile-circle">
                {profilePreview && <img src={profilePreview} className="preview-img" />}
              </div>

              <label htmlFor="profileUpload" className="upload-picture-label">
                Upload Picture
              </label>

              <input
                type="file"
                id="profileUpload"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfileFile(file);
                  setProfilePreview(URL.createObjectURL(file));
                }}
              />
            </div>

            {/* FORM */}
            <form className="register-form" onSubmit={handleRegister}>
              <div className="form-grid">

                {/* NAME */}
                <div className="input-group">
                  <label>Full Name</label>
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>

                {/* EMAIL */}
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                {/* BIRTHDAY */}
                <div className="input-group">
                  <label>Birthday</label>
                  <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </div>

                {/* PASSWORD */}
                <div className="input-group">
                  <label>Password</label>
                  <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>

                {/* ADDRESS */}
                <div className="input-group">
                  <label>Address</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>

                {/* CONTACT */}
                <div className="input-group">
                  <label>Contact Number</label>
                  <input value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                </div>

                {/* VEHICLE TYPE */}
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
                    <select value={routeFrom} onChange={(e) => setRouteFrom(e.target.value)} required>
                      <option value="">From</option>
                      {locations.map((loc) => (
                        <option key={loc}>{loc}</option>
                      ))}
                    </select>

                    <ArrowRight size={20} />

                    <select value={routeTo} onChange={(e) => setRouteTo(e.target.value)} required>
                      <option value="">To</option>
                      {locations.map((loc) => (
                        <option key={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* LICENSE UPLOAD */}
                <div className="upload-row">
                  <div className="input-group upload-group">
                    <label>Driver’s License</label>
                    <div className="upload-box">
                      <input
                        type="file"
                        id="licenseUpload"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setLicenseFile(file);
                          setLicensePreview(URL.createObjectURL(file));
                        }}
                      />
                      <label htmlFor="licenseUpload" className="upload-label">
                        UPLOAD IMAGE <Upload size={16} />
                      </label>
                    </div>
                    {licensePreview && <img src={licensePreview} className="preview-small" />}
                  </div>

                  <div className="input-group upload-group">
                    <label>OR/CR</label>
                    <div className="upload-box">
                      <input
                        type="file"
                        id="orcrUpload"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setOrcrFile(file);
                          setOrcrPreview(URL.createObjectURL(file));
                        }}
                      />
                      <label htmlFor="orcrUpload" className="upload-label">
                        UPLOAD IMAGE <Upload size={16} />
                      </label>
                    </div>
                    {orcrPreview && <img src={orcrPreview} className="preview-small" />}
                  </div>
                </div>

              </div>

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
