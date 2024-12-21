"use client";

import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import SignIn from "./SignIn";
import UserBtn from "./User/UserBtn";

const Navbar = () => {
  //This are the inbuilt fn , to get the user info with clerk fn
  const { user } = useUser();
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const storeToken = async () => {
      if (isSignedIn) {
        // Get the authentication token
        const token: any = await getToken();
        // Store the token in localStorage
        localStorage.setItem("authToken", token);
      }
    };

    storeToken();
  }, [isSignedIn, getToken]);

  console.log("user is:", user);

  return (
    <>
      <section className="bg-blue-500 p-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>Service ally</div>

          {/* Sign In button */}
          {/* {!isSignedIn ? <SignIn /> : <UserButton />} */}
          {!isSignedIn ? <SignIn /> : <UserBtn />}
        </div>
      </section>
    </>
  );
};

export default Navbar;
