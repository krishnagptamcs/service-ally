const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      zip: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
    description: { type: String, required: true },
    descriptionType: {
      type: String,
      enum: ["text", "media", "speech"],
      required: true,
    },
    descriptionMediaURL: { type: String },
    selectedDate: { type: String, required: true },
    isLoggedInUser: { type: Boolean, required: true },
    userId: { type: String }, // Optional for logged-in users
    isLead: { type: Boolean, required: true }, // True if it's a lead
    status: {
      type: String,
      enum: ["lead", "pending", "active", "completed", "cancelled"],
      default: "lead", // Default status for non-logged-in users
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
