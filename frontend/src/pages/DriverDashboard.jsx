import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../css/DriverDashboard.css";
import { Chart } from "chart.js/auto"; 
import ByaheroLogo from "../assets/images/ByaheroLogo.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import TermsAndConditions from "./TermsAndConditions";
import CustomerSupport from "./CustomerSupport";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const navigate = useNavigate();

  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  // ======================
  // LOGOUT FUNCTION (ADDED)
  // ======================
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      console.log("Logging out...");
      window.location.href = "/";
    }
  };

  // ======================
  // CHART INITIALIZATION
  // ======================
  useEffect(() => {
    const ctx = chartRef.current;
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Completed", "Ongoing", "Pending", "Cancelled"],
        datasets: [
          {
            data: [40, 25, 20, 15],
            backgroundColor: ["#4cd964", "#4a63e7", "#ff9500", "#ff3b30"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#111" },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, []);

  // Trip data
  const trips = [
    { plate: "NGA-3456", cap: 15, dest: "Naga", arr: "10:30 AM", status: "Arrived" },
    { plate: "BIC-6789", cap: 12, dest: "Legazpi", arr: "11:00 AM", status: "On Route" },
    { plate: "CAM-1122", cap: 14, dest: "Pili", arr: "12:00 PM", status: "Pending" },
  ];

  return (
    <div className="dashboard-container">
      {/* NAVIGATION */}
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

      {/* OVERVIEW */}
      <section className="dashboard-overview">
        <h2>Dashboard Overview</h2>
        <div className="stats-grid">
          <div className="card highlight"><p>Today's Trip</p><h3>48</h3></div>
          <div className="card"><p>Onboard</p><h3>50</h3></div>
          <div className="card"><p>Weekly Revenue</p><h3>₱140,920</h3></div>
          <div className="card"><p>Vehicle Dispatched</p><h3>30/80</h3></div>
        </div>
      </section>

      {/* TRIP STATUS + CHART */}
      <section className="trip-section">
        <div className="trip-status">
          <h3>Trip Status</h3>
          <table>
            <thead>
              <tr>
                <th>Plate Number</th>
                <th>Capacity</th>
                <th>Destination</th>
                <th>Arrival</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, idx) => (
                <tr key={idx}>
                  <td>{trip.plate}</td>
                  <td>{trip.cap}</td>
                  <td>{trip.dest}</td>
                  <td>{trip.arr}</td>
                  <td>{trip.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="recent-report">
          <h3>Recent Report</h3>
          <canvas ref={chartRef}></canvas>
        </div>
      </section>

      {/* FOOTER */}
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
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
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
