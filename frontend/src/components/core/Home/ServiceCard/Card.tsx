'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import { useAppDispatch } from '@/lib/hooks';
import { setServiceName } from '@/lib/store/slices/bookingSlice';

interface CardProps {
  image: string;
  description: string;
  service: string;
}

const Card: React.FC<CardProps> = ({ image, description, service }) => {
  const router = useRouter(); // Initialize useRouter
  const dispatch = useAppDispatch();

  const handelSelect = () => {
    // Dispatch the action to set the service name
    dispatch(setServiceName(service));

    // Navigate to the booking page
    router.push('/booking');
  };

  return (
    <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-md transition-transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <Image
          src={image}
          alt={service}
          layout="fill"
          objectFit="cover" // Ensures the image covers the area proportionally
          className="rounded-t-lg"
        />
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Service Title */}
        <h5 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white capitalize">
          {service.replace('_', ' ')}
        </h5>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* Action Button */}
        <button
          onClick={handelSelect}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-300"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default Card;
