"use client";

import { WorkspaceProvider } from "@/contexts/workspace/workspace.context";
import { AuthProvider } from "@/contexts/auth/auth.context";
import { DocumentProvider } from "@/contexts/document/document.context";
import { DatablocksProvider } from "../contexts/datablocks/datablocks.context";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <WorkspaceProvider>
          <DatablocksProvider>
            <DocumentProvider>{children}</DocumentProvider>
          </DatablocksProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </>
  );
};

export default AppProviders;
