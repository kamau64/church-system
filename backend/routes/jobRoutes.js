// jobRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Multer config (optional, if you want file uploads for jobs)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get("/", getJobs); // Public
router.post("/", upload.single("file"), createJob);
router.put("/:id", upload.single("file"), updateJob);
router.delete("/:id", deleteJob);

export default router;
