"use client";
import { AppStore, makeStore } from "@/lib/store/store";
import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null); // Initialize useRef with null

  if (!storeRef.current) {
    // Create the store instance when it first renders
    storeRef.current = makeStore();
  }

  // TypeScript will narrow the type of `storeRef.current` after this check
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
