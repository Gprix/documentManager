export interface DataBlock {
  uid: string;
  authorId: string;
  workspaceId: string;
  value: string;
}

export interface WriteDataBlockPayload {
  workspaceId: string;
  value: string;
}
