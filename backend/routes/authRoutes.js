import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";  // <-- IMPORTANT

const router = Router();

// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const {
      role,
      fullName,
      email,
      password,
      birthday,
      address,
      contactNumber,
      vehicleType,
      routes,
      profileImageUrl,
      licenseImageUrl,
      orcrImageUrl
    } = req.body;

    if (!["driver", "operator"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "fullName, email, password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      role,
      fullName,
      email,
      password: hashed,
      birthday,
      address,
      contactNumber,
      vehicleType,
      routes,
      profileImageUrl,
      licenseImageUrl,
      orcrImageUrl
    });

    return res.status(201).json({
      id: user._id,
      role: user.role,
      fullName: user.fullName,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        role: user.role,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// =========================
// UPDATE PROFILE
// =========================
router.put("/update", requireAuth, async (req, res) => {
  try {
    const { id } = req.user; // from JWT payload

    const updates = {
      fullName: req.body.fullName,
      contactNumber: req.body.contactNumber,
      vehicleType: req.body.vehicleType,
      routes: req.body.routes,
      birthday: req.body.birthday,
      address: req.body.address,
      profileImageUrl: req.body.profileImageUrl,
      licenseImageUrl: req.body.licenseImageUrl,
      orcrImageUrl: req.body.orcrImageUrl
    };

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error updating profile" });
  }
});

export default router;