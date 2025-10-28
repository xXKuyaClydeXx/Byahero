import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PassengerPage from "./pages/PassengerPage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";

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
        setUser(data); // me returns the user object directly
      } catch {
        localStorage.removeItem("byahero_token");
        setUser(null);
      }
    }
    verifyToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PassengerPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/schedule" replace />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;