"use client";

import { createContext, useMemo, useState } from "react";
import { DatablocksContextProviderProps } from "./datablocks.context.types";
import { DatablocksContextProviderValue } from "./datablocks.context.types";
import { DataBlock } from "@/services/datablocks/datablocks.service.types";

export const DatablocksContext = createContext<DatablocksContextProviderValue>(
  // @ts-ignore
  {}
);

export const DatablocksProvider = (props: DatablocksContextProviderProps) => {
  const [selectedDatablocks, setSelectedDatablocks] = useState<DataBlock[]>();

  const value: DatablocksContextProviderValue = useMemo(
    () => ({ selectedDatablocks, setSelectedDatablocks }),
    [selectedDatablocks]
  );

  return (
    <DatablocksContext.Provider value={value}>
      {props.children}
    </DatablocksContext.Provider>
  );
};
