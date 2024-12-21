"use client";

import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdContentPaste } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

const UserBtn = () => {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  //Toggle handler
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  //My bookig handler
  const handleMyBookings = () => {
    router.push("/my-bookings"); // Navigate to the "My Bookings" page
  };

  //Lgout handler
  const handleLogout = () => {
    signOut();
    localStorage.removeItem("authToken"); // Clear the token from localStorage
  };

  return (
    <div className="relative">
      {isSignedIn && user ? (
        <div className="flex items-center space-x-2">
          {/* User Profile Picture */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={user?.imageUrl || "/default-profile.png"} // Fallback to default profile picture if none exists
              alt="User Profile"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>

          {/* Dropdown Button */}
          <button
            onClick={toggleDropdown}
            className="relative flex items-center space-x-1 group"
            title="User options"
          >
            <span className="text-base font-semibold">{user?.firstName}</span>
            <IoIosArrowDropdownCircle
              className={`transition-transform duration-300 transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <ul
              role="menu"
              className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg  focus:outline-none transition-all duration-300 ease-in-out top-12 right-0"
            >
              <li
                role="menuitem"
                onClick={handleMyBookings}
                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                <MdContentPaste />
                <p className="text-slate-800 font-medium ml-2">My Bookings</p>
              </li>

              <hr className="my-2 border-slate-200" />

              <li
                role="menuitem"
                onClick={handleLogout}
                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                <CiLogout />
                <p className="text-slate-800 font-medium ml-2">Sign Out</p>
              </li>
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserBtn;
