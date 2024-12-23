const express = require("express");
const {
  registerFieldAgent,
  loginFieldAgent,
} = require("../controllers/authController");

const router = express.Router();

// Register Route for Field Agent
router.post("/register", registerFieldAgent);

// Login Route for Field Agent
router.post("/login", loginFieldAgent);

module.exports = router;
