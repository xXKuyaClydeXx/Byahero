import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./../css/DriverDashboard.css";
import { Chart } from "chart.js/auto"; 
import { Home, CalendarDays, Car, Info } from "lucide-react";
import ByaheroLogo from "../assets/images/ByaheroLogo.png";

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const navigate = useNavigate(); // ✅ navigation hook

  useEffect(() => {
    const ctx = chartRef.current;
    if (!ctx) return;

    // ✅ Destroy existing chart before creating a new one
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
            labels: {
              color: "#111",
            },
          },
        },
      },
    });

    // ✅ Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  const trips = [
    { plate: "NGA-3456", cap: 15, dest: "Naga", arr: "10:30 AM", status: "Arrived" },
    { plate: "BIC-6789", cap: 12, dest: "Legazpi", arr: "11:00 AM", status: "On Route" },
    { plate: "CAM-1122", cap: 14, dest: "Pili", arr: "12:00 PM", status: "Pending" },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
              <div className="nav-header">
                  <img src={ByaheroLogo} alt="Byahero Logo" className="nav-logo" />
              </div>
        <nav className="nav-icons">
          <button className="icon" onClick={() => navigate("/driver-dashboard")} title="Driver Dashboard">
            <Home size={26} />
          </button>
          <button className="icon" onClick={() => navigate("/schedule")} title="Schedule">
            <CalendarDays size={26} />
          </button>
          <button className="icon" onClick={() => navigate("/vehicles")} title="Vehicles">
            <Car size={26} />
          </button>
          <button className="icon" onClick={() => navigate("/about")} title="About">
            <Info size={26} />
          </button>
        </nav>
      </header>

      <section className="dashboard-overview">
        <h2>Dashboard Overview</h2>
        <div className="stats-grid">
          <div className="card highlight">
            <p>Today's Trip</p>
            <h3>48</h3>
          </div>
          <div className="card">
            <p>Onboard</p>
            <h3>50</h3>
          </div>
          <div className="card">
            <p>Weekly Revenue</p>
            <h3>₱140,920</h3>
          </div>
          <div className="card">
            <p>Vehicle Dispatched</p>
            <h3>30/80</h3>
          </div>
        </div>
      </section>

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
              {trips.map((trip, index) => (
                <tr key={index}>
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
          <canvas id="reportChart" ref={chartRef}></canvas>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;