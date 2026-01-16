import express from "express";
import {
  getContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
} from "../controllers/contactInfoController.js";

const router = express.Router();

router.get("/", getContactInfo);           // fetch existing
router.post("/", createContactInfo);       // add new
router.put("/:id", updateContactInfo);     // edit
router.delete("/:id", deleteContactInfo);  // delete

export default router;
