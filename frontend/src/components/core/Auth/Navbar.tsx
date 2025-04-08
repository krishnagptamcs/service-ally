"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";
import UserBtn from "./User/UserBtn";
import SignIn from "./SignIn";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const syncUserData = async () => {
      // Check if user data and token already exist in localStorage
      const localUserData = localStorage.getItem("userData");
      const localAuthToken = localStorage.getItem("authToken");

      if (isSignedIn && user && (!localUserData || !localAuthToken)) {
        try {
          // Extract relevant user data
          const userData = {
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.primaryEmailAddress?.emailAddress,
            phoneNumbers: user?.phoneNumbers?.map((phone) => phone.phoneNumber),
            imageUrl: user?.imageUrl,
          };

          // Get the authentication token
          const token: any = await getToken();

          // Sync with the backend
          await axios.post(
            "http://localhost:5000/api/v1/user/sync-clerk-user",
            userData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Store user data and token in localStorage upon successful sync
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("authToken", token);

          console.log("User data and token synced successfully!");
        } catch (error) {
          console.error("Error syncing user data:", error);
        }
      }
    };

    syncUserData();
  }, [isSignedIn, user, getToken]);

  return (
    <>
      <section className="bg-blue-500 p-3 ">
        <div className="flex items-center justify-between w-11/12 mx-auto">
          {/* Logo */}
          <Link href={"/"}>Service Ally</Link>

          {/* Sign In button */}
          {!isSignedIn ? <SignIn /> : <UserBtn />}
        </div>
      </section>
    </>
  );
};

export default Navbar;
