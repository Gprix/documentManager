"use client";

import SideBar from "@/components/SideBar/SideBar";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { Workspace } from "@/contexts/workspace/workspace.context.types";
import { getWorkspace } from "@/services/workspace/workspace.service";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useState, useRef } from "react";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { selectedWorkspace, setSelectedWorkspace } = useWorkspace();
  const [peekComponents, setPeekComponents] = useState<React.ReactNode[]>([]);
  const selectedWorkspaceFromLocalStorage = useMemo(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem("SELECTED_WORKSPACE");
    }
  }, []);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setPeekComponents([]);
  }, []);

  useLayoutEffect(() => {
    if (selectedWorkspace) return;
    if (pathname === "/workspace") return;

    const restoreLastWorkspace = async () => {
      if (!selectedWorkspaceFromLocalStorage) return;
      const lastWorkspace = await getWorkspace(
        selectedWorkspaceFromLocalStorage
      );
      setSelectedWorkspace(lastWorkspace as Workspace);
    };

    restoreLastWorkspace();
  }, [
    pathname,
    selectedWorkspace,
    selectedWorkspaceFromLocalStorage,
    setSelectedWorkspace,
  ]);

  return (
    <>
      {selectedWorkspace ? (
        <SideBar
          ref={sidebarRef}
          addPeekComponent={(peekComponent: React.ReactNode) =>
            setPeekComponents((prev) => [...prev, peekComponent])
          }
          closePeekComponent={() => {
            setPeekComponents([]);
          }}
        />
      ) : null}
      <section className="WorkspaceArea">
        {peekComponents && peekComponents.length ? (
          <div className="w-[90%] absolute top-0 place-self-end">
            <div className="PeekComponents relative h-screen">
              {peekComponents.map((component) => component)}
            </div>
          </div>
        ) : null}
      </section>
      {children}
    </>
  );
};

export default WorkspaceLayout;
