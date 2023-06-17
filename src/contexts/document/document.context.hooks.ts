"use client";

import { useContext } from "react";

import { DocumentContext } from "./document.context";
import { DocumentContextProviderValue } from "./document.context.types";

export const useDocument = () => {
  const context = useContext<DocumentContextProviderValue>(DocumentContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useDocument must be used within a DocumentContextProvider"
    );
  }

  return context;
};
