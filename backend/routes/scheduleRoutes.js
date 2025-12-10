import express from "express";
import Schedule from "../models/Schedule.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// CREATE SCHEDULE (driver only)
router.post("/", requireAuth, async (req, res) => {
  try {
    const schedule = await Schedule.create({
      ...req.body,
      driver: req.user.id,  // Attach schedule to current driver
    });

    // Populate fullName instead of name
    await schedule.populate("driver", "fullName");

    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL SCHEDULES (public or filtered)
router.get("/", async (req, res) => {
  try {
    const { from, to, vehicle } = req.query;
    const filters = {};

    if (from) filters.from = { $regex: new RegExp(from, "i") };
    if (to) filters.to = { $regex: new RegExp(to, "i") };
    if (vehicle) filters.vehicle = { $regex: new RegExp(vehicle, "i") };

    const schedules = await Schedule.find(filters)
      .populate("driver", "fullName");

    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET DRIVER'S OWN SCHEDULES
router.get("/my", requireAuth, async (req, res) => {
  try {
    const schedules = await Schedule.find({ driver: req.user.id })
      .populate("driver", "fullName"); // FIXED: populate fullName

    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;