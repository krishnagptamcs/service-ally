// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk user ID
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String }, // Assuming only one phone number is stored
    imageUrl: { type: String }, // Clerk user profile image
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
