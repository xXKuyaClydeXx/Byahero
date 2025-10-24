import { Routes, Route } from "react-router-dom";
import PassengerPage from "./components/PassengerPage";
import SchedulePage from "./components/SchedulePage";
import LoginPage from "./components/LoginPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PassengerPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;