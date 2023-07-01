import { DocumentPreview } from "@/components/document/DocumentPreview/DocumentPreview.types";
import { Document } from "@/types/document.types";
import { Dispatch, SetStateAction } from "react";

export interface DocumentContextProviderProps {
  children: React.ReactNode;
}

export interface DocumentContextProviderValue {
  selectedDocument: Document | undefined;
  setSelectedDocument: Dispatch<SetStateAction<Document | undefined>>;
  recentDocuments: DocumentPreview | undefined;
  setRecentDocuments: Dispatch<SetStateAction<DocumentPreview>>;
  archiveDocuments: Document[] | undefined;
  setArchiveDocuments: Dispatch<SetStateAction<Document[]>>;
}
