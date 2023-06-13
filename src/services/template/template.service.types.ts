export interface ProtocolTemplate {
  id: string;
  workspaceId: string;
  authorId: string;
  name: string;
  // TODO: DocumentRawData
  templateData: string;
  enabled: boolean;
}
