import "dotenv/config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "../routes/authRoutes.js";
import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";

import tripRoutes from "../routes/tripRoutes.js"; // Trip routes import

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Authentication routes
app.use("/api/auth", authRoutes);

// Trips routes
app.use("/api/trips", tripRoutes);

// Authenticated user info route
app.get("/api/auth/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Click to open: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });
