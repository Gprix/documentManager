"use client";

import Image from "next/image";
import { TextBlockNodeProps } from "./TextBlockNode.types";
import DropDownArrowSVG from "../../../../../public/images/icons/dropdown-arrow.svg";
import { BaseNode } from "../BaseNode/BaseNode";
import { useLayoutEffect, useState } from "react";
import { TextBlockNodeRawData } from "@/types/document.types";

export const TextBlockNode = (props: TextBlockNodeProps) => {
  const { className = "" } = props;
  const { data, rowIndex } = props;
  const [_blockEntryId, setBlockEntryId] = useState<string | null>(null);

  // const getNodeData = (): TextBlockNodeRawData => {
  //   return {

  //     blockEntryId: _blockEntryId,
  //   };
  // }

  useLayoutEffect(() => {
    if (!data) return;

    const { blockEntryId } = data;
    setBlockEntryId(blockEntryId);
  }, [data]);

  return (
    <BaseNode className={`TextBlockNode pl-3 pr-1 pt-2 pb-1 ${className}`}>
      <div className="flex justify-between items-start">
        <p className="text-black font-light text-sm">Lorem ipsum</p>
        <Image src={DropDownArrowSVG} alt="" className="pl-2 pt-[0.1rem]" />
      </div>
    </BaseNode>
  );
};
