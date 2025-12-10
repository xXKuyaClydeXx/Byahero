import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import "../css/DriverSchedulePage.css";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import { SchedulesContext } from "../context/SchedulesContext";
import API from "../api"; // ✅ Use centralized API

const DriverSchedulePage = () => {
  const [driver, setDriver] = useState(null);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vehicle, setVehicle] = useState("");

  const [departureTime, setDepartureTime] = useState("");
  const [seats, setSeats] = useState("");

  const [filterType, setFilterType] = useState("All");

  const { schedules, fetchSchedules } = useContext(SchedulesContext);

  const formatVehicle = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  // =========================
  // FETCH DRIVER DATA
  // =========================
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const d = res.data;
        setDriver(d);

        if (d.routes) {
          const parts = d.routes.split("→").map((x) => x.trim());
          setFrom(parts[0] || "");
          setTo(parts[1] || "");
        }

        setVehicle(d.vehicleType || "");
      } catch (err) {
        console.error("Error loading driver profile", err);
      }
    };

    fetchDriver();
    fetchSchedules();
  }, []);

  // =========================
  // SUBMIT NEW SCHEDULE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departureTime || !seats) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const newSchedule = {
      from,
      to,
      vehicle,
      departureTime,
      seats: Number(seats),
      terminal: from,
    };

    try {
      const token = localStorage.getItem("token");

      await API.post("/api/schedules", newSchedule, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchSchedules();
      setDepartureTime("");
      setSeats("");
    } catch (err) {
      alert("Error saving schedule: " + err.message);
    }
  };

  // =========================
  // TIME FORMAT
  // =========================
  const formatTime12 = (time24) => {
    if (!time24) return "";
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const filteredSchedules = [...schedules].reverse().filter((s) => {
    const v = s.vehicle.toLowerCase();
    const f = filterType.toLowerCase();
    return f === "all" ? true : v === f;
  });

  return (
    <div className="driver-schedule-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} className="nav-logo" alt="Byahero Logo" />
        </div>

        <div className="nav-links">
          <Link to="/driverdashboard" className="nav-link">Home</Link>
          <span className="nav-link active">Schedule</span>
          <Link to="/driverprofile" className="nav-link">Profile</Link>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      {/* FORM */}
      <div className="schedule-container">
        <div className="schedule-card">
          <h2 className="schedule-title">Driver Trip Schedule</h2>

          {!driver ? (
            <p>Loading your route...</p>
          ) : (
            <form className="schedule-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>From</label>
                <input className="schedule-input" value={from} disabled />
              </div>

              <div className="input-group">
                <label>To</label>
                <input className="schedule-input" value={to} disabled />
              </div>

              <div className="input-group">
                <label>Vehicle Type</label>
                <input className="schedule-input" value={formatVehicle(vehicle)} disabled />
              </div>

              <div className="input-group">
                <label>Departure Time</label>
                <input
                  type="time"
                  className="schedule-input"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Available Seats</label>
                <input
                  type="number"
                  min="1"
                  className="schedule-input"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />
              </div>

              <div className="submit-container">
                <button type="submit" className="submit-btn-inline">
                  Submit Schedule
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Submitted Schedules */}
      <div className="submitted-schedules">
        <h3>Submitted Schedules</h3>

        <div className="filter-buttons">
          {["All", "Van", "Bus", "Jeep"].map((type) => (
            <button
              key={type}
              className={`filter-btn ${filterType === type ? "active" : ""}`}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="submitted-schedules-box">
          {filteredSchedules.length === 0 ? (
            <p>No schedules available.</p>
          ) : (
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Driver</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Vehicle</th>
                  <th>Departure</th>
                  <th>Seats</th>
                </tr>
              </thead>

              <tbody>
                {filteredSchedules.map((sched, idx) => (
                  <tr key={idx}>
                    <td>{sched.driver?.fullName || "Unknown"}</td>
                    <td>{sched.from}</td>
                    <td>{sched.to}</td>
                    <td>{formatVehicle(sched.vehicle)}</td>
                    <td>{formatTime12(sched.departureTime)}</td>
                    <td>{sched.seats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverSchedulePage;