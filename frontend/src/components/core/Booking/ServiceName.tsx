"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks"; // Import custom hook for Redux

const ServiceName: React.FC = () => {
  // Access serviceName from bookingSlice
  const { service_name } = useAppSelector((state) => state.booking);

  return (
    <>
      <section className="w-11/12 mx-auto">
        {" "}
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          Selected Service:{" "}
          {service_name
            ? service_name.replace("_", " ")
            : "No service selected"}
        </div>
      </section>
    </>
  );
};

export default ServiceName;
