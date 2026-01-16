import ContactInfo from "../models/contactInfoModel.js";

// GET contact info (single)
export const getContactInfo = async (req, res) => {
  try {
    const contact = await ContactInfo.findOne().sort({ createdAt: -1 });
    res.json(contact || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contact info" });
  }
};

// ADD contact info
export const createContactInfo = async (req, res) => {
  try {
    const contact = new ContactInfo(req.body);
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create contact info" });
  }
};

// UPDATE contact info
export const updateContactInfo = async (req, res) => {
  try {
    const updated = await ContactInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update contact info" });
  }
};

// DELETE contact info
export const deleteContactInfo = async (req, res) => {
  try {
    await ContactInfo.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact info deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete contact info" });
  }
};
