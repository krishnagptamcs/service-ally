const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const {
      service,
      address,
      description,
      descriptionType,
      descriptionMediaURL,
      selectedDate,
      isLoggedInUser,
      userId,
    } = req.body;

    // Validation
    if (!service || !address || !description || !selectedDate || !descriptionType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Determine if the booking is a lead
    const isLead = !isLoggedInUser;

    // Save booking in the database
    const newBooking = new Booking({
      service,
      address,
      description,
      descriptionType,
      descriptionMediaURL,
      selectedDate,
      isLoggedInUser,
      isLead,
      userId: isLoggedInUser ? userId : undefined, // Only save userId if logged in
      status: isLead ? "lead" : "pending", // Set status based on lead or user booking
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = { createBooking, getAllBookings };
