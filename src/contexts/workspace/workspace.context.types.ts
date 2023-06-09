import { Dispatch, SetStateAction } from "react";

export interface Workspace {
  uid: string;
  name: string;
  ownerUid: string;
}

export interface WorkspaceContextProviderProps {
  children: React.ReactNode;
}

export interface WorkspaceContextProviderValue {
  selectedWorkspace: Workspace | undefined;
  setSelectedWorkspace: Dispatch<SetStateAction<Workspace | undefined>>;
  workspaces: Workspace[];
  setWorkspaces: Dispatch<SetStateAction<Workspace[]>>;
  getWorkspaces: () => void;
}
