import { Dispatch, SetStateAction } from "react";
import { DataBlock } from "@/services/datablocks/datablocks.service.types";

export interface DatablocksContextProviderProps {
  children: React.ReactNode;
}

export interface DatablocksContextProviderValue {
  selectedDatablocks: DataBlock[] | undefined;
  setSelectedDatablocks: Dispatch<SetStateAction<DataBlock[] | undefined>>;
}
