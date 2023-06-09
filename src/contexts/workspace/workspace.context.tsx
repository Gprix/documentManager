"use client";

import { createContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { Workspace } from "./workspace.context.types";
import { WorkspaceContextProviderProps } from "./workspace.context.types";
import { WorkspaceContextProviderValue } from "./workspace.context.types";
import { getCurrentUserWorkspaces } from "@/services/workspace/workspace.service";

export const WorkspaceContext = createContext<WorkspaceContextProviderValue>(
  // @ts-ignore
  {}
);

export const WorkspaceProvider = (props: WorkspaceContextProviderProps) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>();

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const getWorkspaces = async () => {
    const workspaces = await getCurrentUserWorkspaces();
    setWorkspaces(workspaces as Workspace[]);
  };

  useEffect(() => {
    getWorkspaces();
  }, []);

  const value: WorkspaceContextProviderValue = useMemo(() => {
    return {
      selectedWorkspace,
      setSelectedWorkspace,
      workspaces,
      setWorkspaces,
      getWorkspaces,
    };
  }, [selectedWorkspace, workspaces]);

  return (
    <WorkspaceContext.Provider value={value}>
      {props.children}
    </WorkspaceContext.Provider>
  );
};
