import React, { useState } from "react";
import { Upload, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";
import { validateDriverRegistration } from "../validation"; 
import ByaheroLogo from "../assets/images/ByaheroLogo.png";

const RegisterPage = () => {
  const navigate = useNavigate();

  // FORM STATES
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

  // IMAGE STATES
  const [profileImage, setProfileImage] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [orcrImage, setOrcrImage] = useState(null);

  const locations = ["Ligao", "Oas", "Daraga", "Legazpi", "Pilar", "Camalig", "Polangui"];

  // ======================================
  // CLOUDINARY UPLOAD FUNCTION
  // ======================================
  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url; // Cloudinary URL returned by backend
  }

  // ======================================
  // REGISTER HANDLER
  // ======================================
  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    // 1️⃣ VALIDATION
    const errors = validateDriverRegistration({
      fullName,
      email,
      password,
      birthday,
      address,
      contactNumber,
      vehicleType,
      routeFrom,
      routeTo,
    });

    if (errors.length > 0) {
      alert(errors[0]);
      setLoading(false);
      return;
    }

    try {
      // 2️⃣ UPLOAD IMAGES TO CLOUDINARY
      let profileImageUrl = profileImage ? await uploadToCloudinary(profileImage) : "";
      let licenseImageUrl = licenseImage ? await uploadToCloudinary(licenseImage) : "";
      let orcrImageUrl = orcrImage ? await uploadToCloudinary(orcrImage) : "";

      // 3️⃣ FINAL PAYLOAD
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

      // 4️⃣ SEND REQUEST TO BACKEND
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

          {/* HEADER */}
          <div className="register-header">
            <Link to="/login" className="back-btn">
              <ArrowLeft size={18} /> Back
            </Link>
            <h3 className="register-heading">REGISTER</h3>
          </div>

          <div className="register-layout">

            {/* PROFILE UPLOAD */}
            <div className="profile-section">
              <div className="profile-circle"></div>

              <label htmlFor="profileUpload" className="upload-picture-label">
                Upload Picture
              </label>

              <input
                type="file"
                id="profileUpload"
                hidden
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </div>

            {/* FORM */}
            <form className="register-form" onSubmit={handleRegister}>
              <div className="form-grid">

                {/* NAME */}
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* EMAIL */}
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* BIRTHDAY */}
                <div className="input-group">
                  <label>Birthday</label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>

                {/* PASSWORD */}
                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* ADDRESS */}
                <div className="input-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* CONTACT */}
                <div className="input-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>

                {/* VEHICLE TYPE */}
                <div className="input-group">
                  <label>Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
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

                {/* DRIVER LICENSE + OR/CR */}
                <div className="upload-row">
                  <div className="input-group upload-group">
                    <label>Driver’s License</label>
                    <div className="upload-box">
                      <input
                        type="file"
                        id="licenseUpload"
                        hidden
                        onChange={(e) => setLicenseImage(e.target.files[0])}
                      />
                      <label htmlFor="licenseUpload" className="upload-label">
                        UPLOAD IMAGE <Upload size={16} />
                      </label>
                    </div>
                  </div>

                  <div className="input-group upload-group">
                    <label>OR/CR</label>
                    <div className="upload-box">
                      <input
                        type="file"
                        id="orcrUpload"
                        hidden
                        onChange={(e) => setOrcrImage(e.target.files[0])}
                      />
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
