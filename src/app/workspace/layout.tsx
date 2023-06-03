"use client";

import SideBar from "@/components/SideBar/SideBar";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  const { selectedWorkspace } = useWorkspace();

  return (
    <>
      {selectedWorkspace ? <SideBar /> : null}
      {children}
    </>
  );
};

export default WorkspaceLayout;
