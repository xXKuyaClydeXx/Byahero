import "dotenv/config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "../routes/authRoutes.js";
import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";

const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
  })
);

app.use("/api/auth", authRoutes);

app.get("/api/auth/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json(user);
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Click to open: http://localhost:${PORT}`);
});

});