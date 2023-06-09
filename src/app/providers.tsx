"use client";

import { WorkspaceProvider } from "@/contexts/workspace/workspace.context";
import { AuthProvider } from "@/contexts/auth/auth.context";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <WorkspaceProvider>{children}</WorkspaceProvider>
      </AuthProvider>
    </>
  );
};

export default AppProviders;
