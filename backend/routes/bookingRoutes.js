const express = require("express");
const { createBooking, getAllBookings } = require("../controllers/bookingController");

const router = express.Router();

// Route for booking creation
router.post("/create", createBooking);

// Route for fetching all bookings
router.get("/", getAllBookings);

module.exports = router;
