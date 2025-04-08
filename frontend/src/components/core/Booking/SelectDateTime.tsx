'use client'
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setSelectedDate, setSelectedTime } from "@/lib/store/slices/bookingSlice";
import { format, addHours, startOfToday } from "date-fns";

const SelectDateTime = () => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<"today" | "tomorrow" | "choose-date">("choose-date");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedDate, setLocalSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setLocalSelectedTime] = useState<string>("");
  const [noSlotsMessage, setNoSlotsMessage] = useState<string>("");

  // Generate time slots dynamically
  const generateTimeSlots = (start: Date, endHour: number) => {
    const slots: string[] = [];
    let current = start;
    while (current.getHours() < endHour) {
      slots.push(format(current, "hh:mm a"));
      current = addHours(current, 1);
    }
    return slots;
  };

  // Update time slots based on selected tab
  useEffect(() => {
    if (selectedTab === "today") {
      const now = new Date();
      const start = now.getHours() >= 8 ? addHours(now, 1) : startOfToday();
      const availableSlots = generateTimeSlots(start, 20);
      
      if (availableSlots.length === 0) {
        setNoSlotsMessage("It seems like all slots for today are filled. Please select a time for tomorrow! 😊");
      } else {
        setNoSlotsMessage("");
      }
      setTimeSlots(availableSlots);
      setLocalSelectedDate(new Date()); // Automatically set today's date
    } else if (selectedTab === "tomorrow") {
      const tomorrow = addHours(startOfToday(), 24);
      const availableSlots = generateTimeSlots(new Date(tomorrow.setHours(8, 0, 0, 0)), 20);
      setNoSlotsMessage("");
      setTimeSlots(availableSlots);
      setLocalSelectedDate(tomorrow);
    }
  }, [selectedTab]);

  // Handle selection of date and time
  const handleDateSelection = (date: Date) => {
    setLocalSelectedDate(date);
    setTimeSlots(generateTimeSlots(new Date(date.setHours(8, 0, 0, 0)), 20));
  };

  const handleTimeSelection = (time: string) => {
    setLocalSelectedTime(time);
    dispatch(setSelectedDate(selectedDate ? selectedDate.toISOString() : ""));
    dispatch(setSelectedTime(time));
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">Select Date and Time</h2>

      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["today", "tomorrow", "choose-date"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab as "today" | "tomorrow" | "choose-date")}
            className={`px-4 py-2 rounded-md ${
              selectedTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab === "today" && "Today"}
            {tab === "tomorrow" && "Tomorrow"}
            {tab === "choose-date" && "Choose Date"}
          </button>
        ))}
      </div>

      {/* Date Picker for "Choose Date" */}
      {selectedTab === "choose-date" && (
        <div className="mb-4">
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md text-gray-700"
            onChange={(e) => handleDateSelection(new Date(e.target.value))}
          />
        </div>
      )}

      {/* No slots available message for today */}
      {noSlotsMessage && (
        <div className="text-center text-red-600 mb-4">
          <p>{noSlotsMessage}</p>
        </div>
      )}

      {/* Time Slots */}
      <div className="grid grid-cols-3 gap-4">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeSelection(time)}
            className={`px-4 py-2 border rounded-md text-center ${
              selectedTime === time
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectDateTime;
