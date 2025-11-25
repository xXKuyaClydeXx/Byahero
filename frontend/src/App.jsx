// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, onAuthStateChanged } from "./firebase";

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
import ForgotPassword from "./pages/ForgotPassword";
import EnterEmail from "./pages/EnterEmail.jsx";

// ProtectedRoute Component: Requires user to be logged in
const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" />;
  return children;
};

// AuthRoute Component: Redirects user away from login/register if already logged in
const AuthRoute = ({ user, children }) => {
  // Assuming a logged-in user is a 'driver' by default for this redirect
  if (user) return <Navigate to="/driverprofile" />; 
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PassengerPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/enteremail" element={<EnterEmail />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/support" element={<CustomerSupport />} />
      <Route path="/terms" element={<TermsAndConditions />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <AuthRoute user={user}>
            <LoginPage />
          </AuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute user={user}>
            <RegisterPage />
          </AuthRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/driverprofile"
        element={
          <ProtectedRoute user={user}>
            <DriverProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/driverdashboard"
        element={
          <ProtectedRoute user={user}>
            <DriverDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/driverschedule"
        element={
          <ProtectedRoute user={user}>
            <DriverSchedulePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tripsched"
        element={
          <ProtectedRoute user={user}>
            <TripSchedulePage />
          </ProtectedRoute>
        }
      />

      {/* Catch-All */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;