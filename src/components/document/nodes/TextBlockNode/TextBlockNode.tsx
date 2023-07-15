"use client";

import { TextBlockNodeProps } from "./TextBlockNode.types";
import { BaseNode } from "../BaseNode/BaseNode";
import { useEffect, useState, useMemo } from "react";
import { useLayoutEffect } from "react";
import { useDocument } from "@/contexts/document/document.context.hooks";
import { useDatablocks } from "@/contexts/datablocks/datablocks.context.hooks";

import Select, { SingleValue } from "react-select";
import { getLastFromPathname } from "@/utils/common.utils";

export const TextBlockNode = (props: TextBlockNodeProps) => {
  const { className = "" } = props;
  const { data, rowIndex, inlineIndex, onNodeUpdate } = props;
  const { selectedDocument } = useDocument();
  const { selectedDatablocks } = useDatablocks();
  const [blockEntryId, setBlockEntryId] = useState<string | null>(null);
  const [, setTextValue] = useState("");

  const blocksAsOptions = useMemo(() => {
    return selectedDatablocks?.map((datablock) => ({
      value: datablock.uid,
      label: datablock.value,
    }));
  }, [selectedDatablocks]);

  const handleUpdate = (
    option: SingleValue<{ label: string; value: string }>
  ) => {
    if (!selectedDocument) return;

    const { label, value } = option ?? {};

    if (!label || !value) return;

    setTextValue(label);
    setBlockEntryId(value);

    onNodeUpdate({
      rowIndex,
      inlineIndex,
      isFullLine: false,
      type: "textBlock",
      blockEntryId: value,
    });
  };

  useLayoutEffect(() => {
    if (!selectedDocument) return;
  }, [selectedDocument]);

  useLayoutEffect(() => {
    if (!data) return;

    const { blockEntryId } = data;
    setBlockEntryId(blockEntryId);
  }, [data]);

  useEffect(() => {
    if (!blockEntryId) return;

    const datablock = selectedDatablocks?.find(
      (datablock) => datablock.uid === blockEntryId
    );

    if (!datablock) return;

    const { value } = datablock;
    setTextValue(value);
  }, [blockEntryId, selectedDatablocks]);

  return (
    <>
      <BaseNode
        className="TextBlockNode overflow-visible !rounded-lg"
        contentClassName={[
          "hover:bg-gray-200 !rounded-lg",
          "pl-3 pr-1 pt-2 pb-1",
          className,
        ].join(" ")}
      >
        <Select
          value={blocksAsOptions?.find(
            (option) => option.value === blockEntryId
          )}
          formatOptionLabel={(option) => getLastFromPathname(option.label)}
          options={blocksAsOptions}
          isSearchable
          onChange={(option) => handleUpdate(option)}
          className="text-sm font-light"
          styles={{
            control: (provided) => ({
              ...provided,
              border: "none",
              boxShadow: "none",
              backgroundColor: "transparent",
              borderRadius: "0.5rem",
              padding: "0",
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: "none",
            }),
            menu: (provided) => ({
              ...provided,
              minWidth: "20rem",
            }),
          }}
        />
      </BaseNode>
    </>
  );
};
