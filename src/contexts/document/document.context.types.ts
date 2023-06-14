import { Document } from "@/types/document.types";
import { Dispatch, SetStateAction } from "react";

export interface DocumentContextProviderProps {
  children: React.ReactNode;
}

export interface DocumentContextProviderValue {
  selectedDocument: Document | undefined;
  setSelectedDocument: Dispatch<SetStateAction<Document | undefined>>;
}
