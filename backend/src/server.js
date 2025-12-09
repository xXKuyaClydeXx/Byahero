import "dotenv/config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

import authRoutes from "../routes/authRoutes.js";
import scheduleRoutes from "../routes/scheduleRoutes.js";
import uploadRoutes from "../routes/uploadRoutes.js";  // ⭐ CORRECT PATH

import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// ======================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/upload", uploadRoutes);  // ⭐ ENABLE CLOUDINARY ROUTE

// ======================
// AUTHENTICATED USER CHECK
// ======================
app.get("/api/auth/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
  });
});
