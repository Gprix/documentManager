"use client";

import { useContext } from "react";

import { WorkspaceContext } from "./workspace.context";
import { WorkspaceContextProviderValue } from "./workspace.context.types";

export const useWorkspace = () => {
  const context = useContext<WorkspaceContextProviderValue>(WorkspaceContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useWorkspace must be used within a WorkspaceContextProvider"
    );
  }

  return context;
};
