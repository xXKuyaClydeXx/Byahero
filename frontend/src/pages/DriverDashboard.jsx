import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./../css/DriverDashboard.css";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  // ======================
  // FETCH DRIVER DATA
  // ======================
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDriver(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ======================
  // LOGOUT
  // ======================
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  if (loading)
    return <p style={{ marginTop: "40px", textAlign: "center" }}>Loading dashboard...</p>;

  if (!driver)
    return <p style={{ marginTop: "40px", textAlign: "center" }}>Driver not found.</p>;

  return (
    <div className="dashboard-container">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
        </div>
        <div className="nav-links">
          <span className="nav-link active">Home</span>
          <Link to="/driverschedule" className="nav-link">Schedule</Link>
          <Link to="/driverprofile" className="nav-link">Profile</Link>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* ================= OVERVIEW ================= */}
      <section className="dashboard-overview">
        <h2>Welcome, {driver.fullName}</h2>

        <div className="stats-grid" style={{ marginTop: "1rem" }}>
          <div className="card">
            <p>Vehicle Type</p>
            <h3>{driver.vehicleType || "—"}</h3>
          </div>

          <div className="card">
            <p>Route</p>
            <h3>{driver.routes || "—"}</h3>
          </div>

          <div className="card">
            <p>Contact Number</p>
            <h3>{driver.contactNumber || "—"}</h3>
          </div>

          <div className="card">
            <p>Email</p>
            <h3 style={{ fontSize: "14px" }}>{driver.email}</h3>
          </div>
        </div>
      </section>

      {/* ================= PROFILE DOCUMENTS ================= */}
      <section className="trip-section">
        <div className="trip-status">
          <h3>Driver Images</h3>

          <table>
            <tbody>
              <tr>
                <td><strong>Profile Image</strong></td>
                <td>
                  {driver.profileImageUrl ? (
                    <img
                      src={driver.profileImageUrl}
                      alt="Profile"
                      style={{ width: "120px", borderRadius: "10px" }}
                    />
                  ) : "—"}
                </td>
              </tr>

              <tr>
                <td><strong>License Image</strong></td>
                <td>
                  {driver.licenseImageUrl ? (
                    <img
                      src={driver.licenseImageUrl}
                      alt="License"
                      style={{ width: "120px", borderRadius: "10px" }}
                    />
                  ) : "—"}
                </td>
              </tr>

              <tr>
                <td><strong>OR/CR Image</strong></td>
                <td>
                  {driver.orcrImageUrl ? (
                    <img
                      src={driver.orcrImageUrl}
                      alt="ORCR"
                      style={{ width: "120px", borderRadius: "10px" }}
                    />
                  ) : "—"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RIGHT SIDE: Reports Placeholder */}
        <div className="recent-report">
          <h3>Reports</h3>
          <p style={{ marginTop: "10px", opacity: 0.6 }}>
            No data available yet. Reports will appear here once trip logs are recorded.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-links">
          <div className="footer-column">
            <p onClick={() => navigate("/about")}>About Us</p>
            <p onClick={() => setShowSupport(true)}>Customer Support</p>
            <p onClick={() => setShowTerms(true)}>Terms & Condition</p>
          </div>
          <div className="footer-column">
            <p>Vehicle Available</p>
            <p>Trip Schedule</p>
          </div>
        </div>

        <div className="footer-column footer-social">
          <div className="icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
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

export default Dashboard;