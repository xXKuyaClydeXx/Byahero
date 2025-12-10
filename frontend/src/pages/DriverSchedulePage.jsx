import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import "../css/DriverSchedulePage.css";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import { SchedulesContext } from "../context/SchedulesContext";

const DriverSchedulePage = () => {
  const locations = [
    "Daraga",
    "Pilar",
    "Legazpi",
    "Camalig",
    "Oas",
    "Polangui",
    "Ligao",
  ];
  const vehicleTypes = ["Van", "Bus", "Jeepney"];

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [seats, setSeats] = useState("");
  const [vehicle, setVehicle] = useState(vehicleTypes[0]);

  const { schedules, fetchSchedules } = useContext(SchedulesContext);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!from || !to || !departureTime || !seats || !vehicle) {
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

      if (!token) {
        alert("Missing authentication token. Please login again.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSchedule),
      });

      if (!res.ok) throw new Error(await res.text());

      fetchSchedules();

      setFrom("");
      setTo("");
      setDepartureTime("");
      setSeats("");
      setVehicle(vehicleTypes[0]);

    } catch (err) {
      alert("Error saving schedule: " + err.message);
    }
  };

  const formatTime12 = (time24) => {
    if (!time24) return "";
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      window.location.href = "/";
    }
  };

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

      {/* Form */}
      <div className="schedule-container">
        <div className="schedule-card">
          <h2 className="schedule-title">Driver Trip Schedule</h2>

          <form className="schedule-form" onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label>From</label>
              <select
                className="schedule-input"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                <option value="">Select location</option>
                {locations.map((loc) => <option key={loc}>{loc}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>To</label>
              <select
                className="schedule-input"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <option value="">Select destination</option>
                {locations
                  .filter((loc) => loc !== from)
                  .map((loc) => <option key={loc}>{loc}</option>)
                }
              </select>
            </div>

            <div className="input-group">
              <label>Vehicle Type</label>
              <select
                className="schedule-input"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
              >
                {vehicleTypes.map((v) => <option key={v}>{v}</option>)}
              </select>
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
                className="schedule-input"
                min="1"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Schedule
            </button>
          </form>
        </div>
      </div>

      {/* Submitted Schedules */}
      <div className="submitted-schedules">
        <h3>Submitted Schedules</h3>

        {schedules.length === 0 ? (
          <p className="no-schedule-text">No schedules submitted yet.</p>
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
              {schedules.map((sched, idx) => (
                <tr key={idx}>
                  <td>{sched.driver?.fullName || "Unknown"}</td>
                  <td>{sched.from}</td>
                  <td>{sched.to}</td>
                  <td>{sched.vehicle}</td>
                  <td>{formatTime12(sched.departureTime)}</td>
                  <td>{sched.seats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer className="footer">
        <p>© 2025 Byahero. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DriverSchedulePage;