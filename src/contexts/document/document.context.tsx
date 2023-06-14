"use client";

import { createContext, useMemo, useState } from "react";
import { DocumentContextProviderProps } from "./document.context.types";
import { DocumentContextProviderValue } from "./document.context.types";
import { Document } from "@/types/document.types";

export const DocumentContext = createContext<DocumentContextProviderValue>(
  // @ts-ignore
  {}
);

export const DocumentProvider = (props: DocumentContextProviderProps) => {
  const [selectedDocument, setSelectedDocument] = useState<Document>();

  const value: DocumentContextProviderValue = useMemo(
    () => ({ selectedDocument, setSelectedDocument }),
    [selectedDocument]
  );

  return (
    <DocumentContext.Provider value={value}>
      {props.children}
    </DocumentContext.Provider>
  );
};
