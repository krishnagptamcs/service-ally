"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // To access Redux state
import { useRouter } from "next/router"; // For navigation
import axios from "axios";
import { resetBooking } from "@/lib/store/slices/bookingSlice";

const FinalSubmit = () => {
  const dispatch = useDispatch();
  //   const router = useRouter();

  // Get values from Redux state
  const {
    service_name,
    description,
    description_type,
    selected_date,
    userAddress,
  } = useSelector((state) => state.booking);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prepare the data object to send to the backend
  const bookingData = {
    service: service_name,
    address: {
      street: userAddress?.street || "",
      city: userAddress?.city || "",
      zip: userAddress?.zip || "",
      phone: userAddress?.phone || "",
      email: "lead@example.com", // Use actual email if needed
      name: "Jane Doe", // Replace with the logged-in user's name
    },
    description,
    descriptionType: description_type,
    descriptionMediaURL: null, // Add media URL if needed
    selectedDate: selected_date,
    isLoggedInUser: false, // Change based on user authentication status
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/booking/create",
        bookingData
      );
      // Handle success response
      console.log("Booking submitted successfully:", response.data);
      // Optionally reset the Redux state
      dispatch(resetBooking());
      //   router.push('/success'); // Redirect to success page or another page
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("Error submitting booking:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-6">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </div>
    </div>
  );
};

export default FinalSubmit;
