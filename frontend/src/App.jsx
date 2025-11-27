import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PassengerPage from "./pages/PassengerPage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import CustomerSupport from "./pages/CustomerSupport";
import TermsAndConditions from "./pages/TermsAndConditions";
import TripSchedulePage from "./pages/TripSchedulePage";
import DriverProfilePage from "./pages/DriverProfilePage";
import DriverDashboard from "./pages/DriverDashboard";
import DriverSchedulePage from "./pages/DriverSchedulePage";

// ✅ Import the context provider
import { SchedulesProvider } from "./context/SchedulesContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("byahero_token");
      if (!token) return;
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Invalid token");
        const data = await res.json();
        setUser(data); // set the logged-in user data
      } catch (err) {
        console.error("Token verification failed", err);
        localStorage.removeItem("byahero_token"); // clear invalid token
        setUser(null); // reset user state
      }
    }
    verifyToken(); // on mount, verify token
  }, []);

  return (
    // ✅ Wrap your app in SchedulesProvider to manage schedules state globally
    <SchedulesProvider>
      <Routes>
        <Route path="/" element={<PassengerPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        {/* If user is logged in, redirect them to /schedule */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/schedule" replace />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<CustomerSupport />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/tripsched" element={<TripSchedulePage />} />
        <Route path="/driverprofile" element={<DriverProfilePage />} />
        {/* Driver Dashboard and Schedule Pages */}
        <Route path="/driverdashboard" element={<DriverDashboard />} />
        <Route path="/driverschedule" element={<DriverSchedulePage />} />
        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SchedulesProvider>
  );
}

export default App;