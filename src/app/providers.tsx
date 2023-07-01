"use client";

import { WorkspaceProvider } from "@/contexts/workspace/workspace.context";
import { AuthProvider } from "@/contexts/auth/auth.context";
import { DocumentProvider } from "@/contexts/document/document.context";
import { DatablocksProvider } from "../contexts/datablocks/datablocks.context";
import { TemplatesProvider } from "../contexts/templates/templates.context";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <WorkspaceProvider>
          <TemplatesProvider>
            <DatablocksProvider>
              <DocumentProvider>{children}</DocumentProvider>
            </DatablocksProvider>
          </TemplatesProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </>
  );
};

export default AppProviders;
