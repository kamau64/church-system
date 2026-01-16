import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Check if admin already exists
    const adminExists = await User.findOne({ username: "admin" });

    if (adminExists) {
      console.log("✅ Admin user already exists");
      process.exit(0);
    }

    // Create admin
    const admin = await User.create({
      username: "admin",
      password: "Admin123", // will be hashed
      role: "admin",
    });

    console.log("🔥 Admin created successfully");
    console.log({
      username: admin.username,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
