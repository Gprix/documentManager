"use client";

import { useContext } from "react";

import { TemplatesContext } from "./templates.context";
import { TemplatesContextProviderValue } from "./templates.context.types";

export const useTemplates = () => {
  const context = useContext<TemplatesContextProviderValue>(TemplatesContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useTemplates must be used within a TemplatesContextProvider"
    );
  }

  return context;
};
