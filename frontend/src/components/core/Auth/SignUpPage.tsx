// pages/sign-up.js
'use client'
import { SignUp } from '@clerk/nextjs';
import React, { useState } from 'react';

const SignUpPage = () => {
  const [role, setRole] = useState('');

  // You can store the selected role in the user metadata after sign-up
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignUpComplete = async (user) => {
    // Once the user signs up, you can update their metadata (role)
    if (role) {
      // Add the role as custom metadata
      await user.updateMetadata({ role });
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <SignUp
        afterSignUpUrl="/dashboard"  // Redirect after successful signup
        onSignUpComplete={handleSignUpComplete} // Handle additional actions after sign up
        
      >
        <div>
          <label htmlFor="role">Select Role</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="">Select a role</option>
            <option value="customer">Customer</option>
            <option value="service_provider">Service Provider</option>
          </select>
        </div>
      </SignUp>
    </div>
  );
};

export default SignUpPage;
