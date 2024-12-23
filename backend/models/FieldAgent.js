const mongoose = require("mongoose");

const fieldAgentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "field_agent" }, // Set role to field_agent
  },
  { timestamps: true }
);

module.exports = mongoose.model("FieldAgent", fieldAgentSchema);
