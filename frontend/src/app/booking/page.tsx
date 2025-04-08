import FinalSubmit from "@/components/core/Booking/FinalSubmit";
import SelectDateTime from "@/components/core/Booking/SelectDateTime";
import SelectDescription from "@/components/core/Booking/SelectDescritiption";
import ServiceName from "@/components/core/Booking/ServiceName";
import UserAddress from "@/components/core/Booking/UserAddress";
import React from "react";

const BookingPage = () => {
  return (
    <>
      <ServiceName />
      <SelectDescription />
      <SelectDateTime />
      <UserAddress />
      <FinalSubmit/>
    </>
  );
};

export default BookingPage;
