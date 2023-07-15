export interface Workspace {
  uid: string;
  ownerUid: string;
  name: string;
  members: string[];
}

export interface WriteWorkspacePayload
  extends Omit<Workspace, "uid" | "ownerUid" | "members"> {}
