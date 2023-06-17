"use client";

import { useAuth } from "@/contexts/auth/auth.context.hooks";
import { useDatablocks } from "@/contexts/datablocks/datablocks.context.hooks";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { getDatablocksInWorkspace } from "@/services/datablocks/datablocks.service";
import { DataBlock } from "@/services/datablocks/datablocks.service.types";
import { useEffect } from "react";

const useListenWorkspace = () => {
  const { selectedWorkspace } = useWorkspace();
  const { setSelectedDatablocks } = useDatablocks();
  const { uid: workspaceUid } = selectedWorkspace ?? {};
  const { uid } = useAuth();

  useEffect(() => {
    if (!workspaceUid) return;
    if (!uid) return;

    const getDataBlocks = async () => {
      const datablocks = await getDatablocksInWorkspace(workspaceUid);
      setSelectedDatablocks(datablocks as DataBlock[]);
    };

    getDataBlocks();
  }, [setSelectedDatablocks, uid, workspaceUid]);
};

export default useListenWorkspace;
