"use client";

import SideBar from "@/components/SideBar/SideBar";
import { useAuth } from "@/contexts/auth/auth.context.hooks";
import { useDatablocks } from "@/contexts/datablocks/datablocks.context.hooks";
import { useTemplates } from "@/contexts/templates/templates.context.hooks";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { getDatablocksInWorkspace } from "@/services/datablocks/datablocks.service";
import { DataBlock } from "@/services/datablocks/datablocks.service.types";
import { getTemplatesInWorkspace } from "@/services/template/template.service";
import { Template } from "@/services/template/template.service.types";
import { getWorkspace } from "@/services/workspace/workspace.service";
import { Workspace } from "@/services/workspace/workspace.service.types";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useState, useRef } from "react";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { selectedWorkspace, setSelectedWorkspace } = useWorkspace();
  const { setSelectedTemplates } = useTemplates();
  const { setSelectedDatablocks } = useDatablocks();
  const { uid } = useAuth();
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

  useLayoutEffect(() => {
    if (!uid) return;
    if (!selectedWorkspace) return;

    const getDatablocks = async () => {
      const datablocks = await getDatablocksInWorkspace(selectedWorkspace.uid);
      setSelectedDatablocks(datablocks as DataBlock[]);
    };

    getDatablocks();
  }, [selectedWorkspace, setSelectedDatablocks, uid]);

  useLayoutEffect(() => {
    if (!uid) return;
    if (!selectedWorkspace) return;

    const getTemplates = async () => {
      const templates = await getTemplatesInWorkspace(selectedWorkspace.uid);
      setSelectedTemplates(templates as Template[]);
    };

    getTemplates();
  }, [selectedWorkspace, setSelectedTemplates, uid]);

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
