import React, { createContext, useState, useCallback } from "react";

export const SchedulesContext = createContext();

export const SchedulesProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);

  // ✅ Fetch all schedules from backend
  const fetchSchedules = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/schedules");
      const data = await res.json();
      setSchedules(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
    }
  }, []);

  return (
    <SchedulesContext.Provider value={{ schedules, setSchedules, fetchSchedules }}>
      {children}
    </SchedulesContext.Provider>
  );
};