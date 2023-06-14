"use client";

import { WorkspaceProvider } from "@/contexts/workspace/workspace.context";
import { AuthProvider } from "@/contexts/auth/auth.context";
import { DocumentProvider } from "@/contexts/document/document.context";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <WorkspaceProvider>
          <DocumentProvider>{children}</DocumentProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </>
  );
};

export default AppProviders;
