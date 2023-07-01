"use client";

import { createContext, useMemo, useState } from "react";
import { TemplatesContextProviderProps } from "./templates.context.types";
import { TemplatesContextProviderValue } from "./templates.context.types";
import { Template } from "@/services/template/template.service.types";

export const TemplatesContext = createContext<TemplatesContextProviderValue>(
  // @ts-ignore
  {}
);

export const TemplatesProvider = (props: TemplatesContextProviderProps) => {
  const [selectedTemplates, setSelectedTemplates] = useState<Template[]>();

  const value: TemplatesContextProviderValue = useMemo(
    () => ({ selectedTemplates, setSelectedTemplates }),
    [selectedTemplates]
  );

  return (
    <TemplatesContext.Provider value={value}>
      {props.children}
    </TemplatesContext.Provider>
  );
};
