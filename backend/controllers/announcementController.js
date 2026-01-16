import Announcement from "../models/Announcement.js";
import fs from "fs";
import path from "path";

// GET all announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: error.message });
  }
};

// CREATE new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    const announcement = await Announcement.create({ title, description, eventDate, image });
    res.status(201).json(announcement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(400).json({ message: error.message });
  }
};

// UPDATE announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, eventDate } = req.body;
    const newImage = req.file ? req.file.filename : undefined;

    const announcement = await Announcement.findById(id);
    if (!announcement) return res.status(404).json({ message: "Announcement not found" });

    // Delete old image if new one uploaded
    if (newImage && announcement.image) {
      const oldImagePath = path.join(path.resolve(), "uploads", announcement.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Deleted old image:", oldImagePath);
      }
    }

    announcement.title = title || announcement.title;
    announcement.description = description || announcement.description;
    announcement.eventDate = eventDate || announcement.eventDate;
    if (newImage !== undefined) announcement.image = newImage;

    await announcement.save();
    res.json({ message: "Announcement updated successfully", announcement });
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(400).json({ message: error.message });
  }
};

// DELETE announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id);
    if (!announcement) return res.status(404).json({ message: "Announcement not found" });

    // Delete image file if exists
    if (announcement.image) {
      const imagePath = path.join(path.resolve(), "uploads", announcement.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Deleted image file:", imagePath);
      }
    }

    // Use findByIdAndDelete instead of deprecated remove()
    await Announcement.findByIdAndDelete(id);

    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: error.message });
  }
};
