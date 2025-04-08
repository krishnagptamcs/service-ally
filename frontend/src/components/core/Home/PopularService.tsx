import React from "react"; // Make sure the Card component path is correct
import { services } from "@/data/serviceData";
import Card from "./ServiceCard/Card";

const PopularService = () => {
  return (
    <section className="w-11/12 mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <Card
          key={service.id}
          image={service.image}
          description={service.description}
          service={service.service}
        />
      ))}
    </div>
    </section>
  );
};

export default PopularService;
