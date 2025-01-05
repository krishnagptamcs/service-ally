// routes/user.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Route to sync Clerk user data with backend
router.post("/sync-clerk-user", async (req, res) => {
  try {
    const { id, firstName, lastName, email, phoneNumbers, imageUrl } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ clerkId: id });

    if (!user) {
      // Create a new user if not exists
      user = new User({
        clerkId: id,
        firstName,
        lastName,
        email,
        phoneNumber: phoneNumbers.length > 0 ? phoneNumbers[0] : null,
        imageUrl,
      });
      await user.save();
      return res.status(201).json({ message: "User created successfully", user });
    }

    // Update existing user details if necessary
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumbers.length > 0 ? phoneNumbers[0] : null;
    user.imageUrl = imageUrl;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
