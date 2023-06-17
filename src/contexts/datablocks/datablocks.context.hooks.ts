"use client";

import { useContext } from "react";

import { DatablocksContext } from "./datablocks.context";
import { DatablocksContextProviderValue } from "./datablocks.context.types";

export const useDatablocks = () => {
  const context = useContext<DatablocksContextProviderValue>(DatablocksContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useDatablocks must be used within a DatablocksContextProvider"
    );
  }

  return context;
};
