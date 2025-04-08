import { Service } from "@/type";
import ac_image from "../../public/assets/Ac service.png";
import plumbing_image from "../../public/assets/Plumbing service.png";
import roof_image from "../../public/assets/Roof Top.png";

export const services: Service[] = [
  {
    id: 1,
    image: ac_image,
    description: "Professional AC repair and maintenance services.",
    service: "ac_service",
  },
  {
    id: 2,
    image: plumbing_image,
    description: "Expert plumbing solutions for all your needs.",
    service: "plumbing_service",
  },
  {
    id: 3,
    image: roof_image,
    description: "Quality rooftop installation and repair services.",
    service: "rooftop_service",
  },
];
