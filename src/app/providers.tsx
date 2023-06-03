"use client";

import { WorkspaceProvider } from "@/contexts/workspace/workspace.context";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <WorkspaceProvider>{children}</WorkspaceProvider>
    </>
  );
};

export default AppProviders;
