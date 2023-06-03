"use client";

import { createContext, useMemo, useState } from "react";
import { Workspace } from "./workspace.context.types";
import { WorkspaceContextProviderProps } from "./workspace.context.types";
import { WorkspaceContextProviderValue } from "./workspace.context.types";

export const WorkspaceContext = createContext<WorkspaceContextProviderValue>(
  // @ts-ignore
  {}
);

export const WorkspaceProvider = (props: WorkspaceContextProviderProps) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>();

  const value: WorkspaceContextProviderValue = useMemo(() => {
    return {
      selectedWorkspace,
      setSelectedWorkspace,
    };
  }, [selectedWorkspace]);

  return (
    <WorkspaceContext.Provider value={value}>
      {props.children}
    </WorkspaceContext.Provider>
  );
};
