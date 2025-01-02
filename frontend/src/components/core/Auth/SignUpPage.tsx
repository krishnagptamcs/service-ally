// pages/sign-up.js
"use client";
import { SignUp } from "@clerk/nextjs";
import React, { useState } from "react";

const SignUpPage = () => {
  const [role, setRole] = useState("");


  return (
    <div>
      <h2>Sign Up</h2>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
