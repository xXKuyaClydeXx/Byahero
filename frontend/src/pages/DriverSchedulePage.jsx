import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import "../css/DriverSchedulePage.css";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import { SchedulesContext } from "../context/SchedulesContext";

const DriverSchedulePage = () => {
  const locations = ["Daraga", "Pilar", "Legazpi", "Camalig", "Oas", "Polangui", "Ligao"];
  const vehicleTypes = ["Van", "Bus", "Jeepney"];

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [seats, setSeats] = useState("");
  const [vehicle, setVehicle] = useState(vehicleTypes[0]);

  const { schedules, fetchSchedules } = useContext(SchedulesContext);

  // Fetch schedules on mount
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const handleFromChange = (e) => {
    const selected = e.target.value;
    setFrom(selected);
    if (selected === to) setTo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!from || !to || !departureTime || !seats || !vehicle) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const newSchedule = { from, to, departureTime, seats: Number(seats), vehicle, terminal: from };

    try {
      await fetch("http://localhost:5000/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newSchedule),
      });

      // Refresh schedules in context
      fetchSchedules();

      // Reset form
      setFrom(""); setTo(""); setDepartureTime(""); setSeats(""); setVehicle(vehicleTypes[0]);
    } catch (err) {
      console.error("Error submitting schedule:", err);
      alert("Error saving schedule.");
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
    if (window.confirm("Are you sure you want to logout?")) window.location.href = "/";
  };

  return (
    <div className="driver-schedule-page">
      <nav className="navbar">
        <div className="nav-header">
          <img src={ByaheroLogo} className="nav-logo" alt="Byahero Logo" />
        </div>
        <div className="nav-links">
          <Link to="/driverdashboard" className="nav-link">Home</Link>
          <span className="nav-link active">Schedule</span>
          <Link to="/driverprofile" className="nav-link">Profile</Link>
          <button className="logout-btn" onClick={handleLogout}><LogOut size={16} /> Logout</button>
        </div>
      </nav>

      {/* Form */}
      <div className="schedule-container">
        <div className="schedule-card">
          <h2 className="schedule-title">Driver Trip Schedule</h2>
          <form className="schedule-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>From</label>
              <select className="schedule-input" value={from} onChange={handleFromChange}>
                <option value="">Select location</option>
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>To</label>
              <select className="schedule-input" value={to} onChange={e => setTo(e.target.value)}>
                <option value="">Select destination</option>
                {locations.filter(loc => loc !== from).map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Vehicle Type</label>
              <select className="schedule-input" value={vehicle} onChange={e => setVehicle(e.target.value)}>
                {vehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Departure Time</label>
              <input type="time" className="schedule-input" value={departureTime} onChange={e => setDepartureTime(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Available Seats</label>
              <input type="number" min="1" className="schedule-input" value={seats} onChange={e => setSeats(e.target.value)} />
            </div>
            <button type="submit" className="submit-btn">Submit Schedule</button>
          </form>
        </div>
      </div>

      {/* Submitted schedules */}
      {schedules.length > 0 && (
        <div className="submitted-schedules">
          <h3>Submitted Schedules</h3>
          <ul>
            {schedules.map((sched, idx) => (
              <li key={idx} className="schedule-item">
                <strong>From:</strong> {sched.from} | <strong>To:</strong> {sched.to} | <strong>Vehicle:</strong> {sched.vehicle} | <strong>Time:</strong> {formatTime12(sched.departureTime)} | <strong>Seats:</strong> {sched.seats}
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer className="footer">
        <p>© 2025 Byahero. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DriverSchedulePage;