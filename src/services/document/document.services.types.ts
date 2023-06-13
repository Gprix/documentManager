import { DocumentRawData } from "@/types/document.types";

export interface WriteDocumentPayload {
  title: string;
  workspaceId: string;
  documentData: DocumentRawData;
}
