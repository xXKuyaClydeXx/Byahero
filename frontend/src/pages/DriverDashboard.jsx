import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; // ✅ USE CENTRALIZED API
import "./../css/DriverDashboard.css";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import { LogOut } from "lucide-react";

// Capitalize vehicle type
const formatVehicle = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH DRIVER DATA
  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setDriver(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // LOGOUT
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  if (loading)
    return (
      <p style={{ marginTop: "40px", textAlign: "center" }}>
        Loading dashboard...
      </p>
    );

  if (!driver)
    return (
      <p style={{ marginTop: "40px", textAlign: "center" }}>
        Driver not found.
      </p>
    );

  return (
    <div className="dashboard-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
        </div>
        <div className="nav-links">
          <span className="nav-link active">Home</span>
          <Link to="/driverschedule" className="nav-link">
            Schedule
          </Link>
          <Link to="/driverprofile" className="nav-link">
            Profile
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* OVERVIEW */}
      <section className="dashboard-overview">
        <h2>Welcome, {driver.fullName}</h2>

        <div className="stats-grid" style={{ marginTop: "1rem" }}>
          <div className="card">
            <p>Vehicle Type</p>
            <h3>{formatVehicle(driver.vehicleType) || "—"}</h3>
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

      {/* DOCUMENTS SECTION */}
      <section className="trip-section">
        <div className="trip-status">
          <h3>Driver Images</h3>

          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Profile Image</strong>
                </td>
                <td>
                  {driver.profileImageUrl ? (
                    <img
                      src={driver.profileImageUrl}
                      alt="Profile"
                      style={{ width: "120px", borderRadius: "10px" }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>License Image</strong>
                </td>
                <td>
                  {driver.licenseImageUrl ? (
                    <img
                      src={driver.licenseImageUrl}
                      alt="License"
                      style={{ width: "120px", borderRadius: "10px" }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>OR/CR Image</strong>
                </td>
                <td>
                  {driver.orcrImageUrl ? (
                    <img
                      src={driver.orcrImageUrl}
                      alt="ORCR"
                      style={{ width: "120px", borderRadius: "10px" }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reports Placeholder */}
        <div className="recent-report">
          <h3>Reports</h3>
          <p style={{ marginTop: "10px", opacity: 0.6 }}>
            No data available yet. Reports will appear here once trip logs are
            recorded.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;