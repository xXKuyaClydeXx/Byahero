import express from "express";
import multer from "multer";
import cloudinary from "../src/config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "byahero_uploads",
  },
});

const upload = multer({ storage });

// UPLOAD ENDPOINT
router.post("/image", upload.single("file"), (req, res) => {
  try {
    return res.json({ url: req.file.path });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
