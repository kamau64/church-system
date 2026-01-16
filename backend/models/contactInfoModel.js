import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema({
  phone: String,
  whatsapp: String,
  facebook: String,
  instagram: String,
});

export default mongoose.model("ContactInfo", contactInfoSchema);
