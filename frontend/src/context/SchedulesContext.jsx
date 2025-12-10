import React, { createContext, useState, useCallback } from "react";
import API from "../api"; // <-- USE API WRAPPER

export const SchedulesContext = createContext();

export const SchedulesProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);

  // Fetch schedules from deployed backend
  const fetchSchedules = useCallback(async () => {
    try {
      const res = await API.get("/api/schedules");
      setSchedules(res.data);
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
