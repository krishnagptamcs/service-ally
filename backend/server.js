const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db"); // Import the DB connection function

//This fn is use to read the env value from env files
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api/v1/service", authRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
