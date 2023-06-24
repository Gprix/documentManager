"use client";

import { createContext, useMemo, useState } from "react";
import { DocumentContextProviderProps } from "./document.context.types";
import { DocumentContextProviderValue } from "./document.context.types";
import { Document } from "@/types/document.types";
import { DocumentPreview } from "@/components/document/DocumentPreview/DocumentPreview.types";

export const DocumentContext = createContext<DocumentContextProviderValue>(
  // @ts-ignore
  {}
);

export const DocumentProvider = (props: DocumentContextProviderProps) => {
  const [selectedDocument, setSelectedDocument] = useState<Document>();
  const [recentDocuments, setRecentDocuments] = useState<DocumentPreview>([]);
  const [archiveDocuments, setArchiveDocuments] = useState<Document[]>([]);

  const value: DocumentContextProviderValue = useMemo(() => {
    return {
      selectedDocument,
      setSelectedDocument,
      recentDocuments,
      setRecentDocuments,
      archiveDocuments,
      setArchiveDocuments,
    };
  }, [archiveDocuments, recentDocuments, selectedDocument]);

  return (
    <DocumentContext.Provider value={value}>
      {props.children}
    </DocumentContext.Provider>
  );
};
