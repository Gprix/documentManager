"use client";

import { useContext } from "react";

import { AuthContext } from "./auth.context";
import { AuthContextProviderValue } from "./auth.context.types";

export const useAuth = () => {
  const context = useContext<AuthContextProviderValue>(AuthContext);

  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }

  return context;
};
