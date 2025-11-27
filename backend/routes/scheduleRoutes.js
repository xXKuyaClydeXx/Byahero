import express from "express";
import Schedule from "../models/Schedule.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// CREATE SCHEDULE (driver only)
router.post("/", requireAuth, async (req, res) => {
  try {
    const schedule = await Schedule.create({
      ...req.body,
      driver: req.user.id,  // Associate schedule with the authenticated user
    });
    await schedule.populate("driver", "name");  // Populate driver name
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL SCHEDULES (public)
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("driver", "name");
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET DRIVER'S OWN SCHEDULES (private)
router.get("/my", requireAuth, async (req, res) => {
  try {
    const schedules = await Schedule.find({ driver: req.user.id });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;