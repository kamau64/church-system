import express from "express";
import multer from "multer";
import path from "path";
import { 
  getAnnouncements, 
  createAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement 
} from "../controllers/announcementController.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get("/", getAnnouncements);
router.post("/", upload.single("image"), createAnnouncement);
router.put("/:id", upload.single("image"), updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;
