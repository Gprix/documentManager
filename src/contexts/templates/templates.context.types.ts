import { Template } from "@/services/template/template.service.types";
import { Dispatch, SetStateAction } from "react";

export interface TemplatesContextProviderProps {
  children: React.ReactNode;
}

export interface TemplatesContextProviderValue {
  selectedTemplates: Template[] | undefined;
  setSelectedTemplates: Dispatch<SetStateAction<Template[] | undefined>>;
}
