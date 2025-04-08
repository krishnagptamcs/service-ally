// bookingSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  street: string;
  city: string;
  zip: string;
  phone: string;
}

interface BookingState {
  service_name: string;
  description: string;
  description_type: string;
  selected_date: string | null; // ISO string for the selected date
  selected_time: string | null; // Time in string format, e.g., "11:30 AM"
  userAddress: Address | null;  // Address state
}

const initialState: BookingState = {
  service_name: "",
  description: "",
  description_type: "",
  selected_date: null,
  selected_time: null,
  userAddress: null, // Initial address state
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Set the name of the service
    setServiceName: (state, action: PayloadAction<string>) => {
      state.service_name = action.payload;
    },
    // Set the service description
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    // Set the type of description
    setDescriptionType: (state, action: PayloadAction<string>) => {
      state.description_type = action.payload;
    },
    // Set the selected date (ISO format or null)
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selected_date = action.payload;
    },
    // Set the selected time (time string or null)
    setSelectedTime: (state, action: PayloadAction<string | null>) => {
      state.selected_time = action.payload;
    },
    // Set the user address
    setUserAddress: (state, action: PayloadAction<Address>) => {
      state.userAddress = action.payload;
    },
    // Reset the entire booking state
    resetBooking: () => initialState,
  },
});

export const {
  setServiceName,
  setDescription,
  setDescriptionType,
  setSelectedDate,
  setSelectedTime,
  setUserAddress,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
