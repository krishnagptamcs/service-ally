const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const FieldAgent = require("../models/FieldAgent"); // Use FieldAgent model

// FIELD AGENT REGISTER CONTROLLER
const registerFieldAgent = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the field agent already exists
    const agentExists = await FieldAgent.findOne({ email });
    if (agentExists) {
      return res.status(400).json({ message: "Field agent already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new field agent
    const newAgent = new FieldAgent({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newAgent.save();

    // Create JWT token
    const token = jwt.sign({ id: newAgent._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send response
    res.status(201).json({
      message: "Field agent registered successfully",
      data: {
        firstName: newAgent.firstName,
        lastName: newAgent.lastName,
        email: newAgent.email,
        role: newAgent.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// FIELD AGENT LOGIN CONTROLLER
const loginFieldAgent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the field agent by email
    const agent = await FieldAgent.findOne({ email });
    if (!agent) {
      return res.status(404).json({ message: "Field agent not found" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: agent._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send response
    res.status(200).json({
      message: "Login successful",
      data: {
        firstName: agent.firstName,
        lastName: agent.lastName,
        email: agent.email,
        role: agent.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerFieldAgent, loginFieldAgent };
