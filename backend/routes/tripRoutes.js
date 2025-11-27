import express from "express";
import Trip from "../models/Trip.js";

const router = express.Router();

// Create a new trip
router.post("/", async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search trips by from, to, vehicle
router.get("/search", async (req, res) => {
  const { from, to, vehicle } = req.query;

  try {
    // Basic filtering - you can add more validation if needed
    const query = {};
    if (from) query.from = from;
    if (to) query.to = to;
    if (vehicle) query.vehicle = vehicle;

    const trips = await Trip.find(query);
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
