const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db"); // Import the DB connection function

//This fn is use to read the env value from env files
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3001", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow cookies and credentials
  })
);

// Connect to the database
connectDB();

// Routes
app.use("/api/v1/service", authRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/user",userRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
