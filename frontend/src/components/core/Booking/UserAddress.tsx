'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux'; // Import Redux hooks
import { setUserAddress } from '@/lib/store/slices/bookingSlice';
// Assuming address is handled in bookingSlice

const UserAddress = () => {
  // Define the validation schema using Zod
  const addressSchema = z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    zip: z
      .string()
      .min(5, 'Zip code must be at least 5 digits')
      .max(5, 'Zip code must be exactly 5 digits')
      .regex(/^\d+$/, 'Zip code must be numeric'),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must be between 10 and 15 digits')
      .regex(/^\d+$/, 'Phone number must be numeric'),
  });

  // Set up React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const dispatch = useDispatch(); // Redux dispatch hook

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log('Address data:', data);
    // Dispatch to update Redux store with the form data
    dispatch(setUserAddress(data));  // Assuming you are using setUserAddress to update state
  };

  return (
    <div className="w-11/12 mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Enter Your Address</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Street Address */}
        <div className="flex flex-col">
          <label htmlFor="street" className="mb-1 font-medium">
            Street Address
          </label>
          <input
            {...register('street')}
            id="street"
            type="text"
            className="px-4 py-2 border rounded-md"
            placeholder="Enter street address"
          />
          {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-1 font-medium">
            City
          </label>
          <input
            {...register('city')}
            id="city"
            type="text"
            className="px-4 py-2 border rounded-md"
            placeholder="Enter city"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>

        {/* Zip Code */}
        <div className="flex flex-col">
          <label htmlFor="zip" className="mb-1 font-medium">
            Zip Code
          </label>
          <input
            {...register('zip')}
            id="zip"
            type="text"
            className="px-4 py-2 border rounded-md"
            placeholder="Enter zip code"
          />
          {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-medium">
            Phone Number
          </label>
          <input
            {...register('phone')}
            id="phone"
            type="text"
            className="px-4 py-2 border rounded-md"
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAddress;
