import { useLayoutEffect, useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { TextInputNodeProps } from "./TextInputNode.types";
import { useDocument } from "@/contexts/document/document.context.hooks";

export const TextInputNode = (props: TextInputNodeProps) => {
  const { className = "" } = props;
  const { data, rowIndex, inlineIndex, onNodeUpdate } = props;
  const { selectedDocument } = useDocument();
  const [value, setValue] = useState("");
  const [linkingKey, setLinkingKey] = useState<string | null>(null);
  const linkedStyle = linkingKey ? "bg-primaryLight" : "";
  const linkedInputStyle = linkingKey ? "border-primary text-primary" : "";

  const handleUpdate = (updatedValue: string) => {
    if (!onNodeUpdate) return;
    if (!selectedDocument) return;

    onNodeUpdate({
      rowIndex,
      inlineIndex,
      isFullLine: false,
      type: "textInput",
      linkedTo: linkingKey,
      value: updatedValue,
    });
  };

  useLayoutEffect(() => {
    if (!selectedDocument) return;
  }, [selectedDocument]);

  useLayoutEffect(() => {
    if (!data) return;

    const { linkedTo, value } = data;
    setValue(value);
    setLinkingKey(linkedTo);
  }, [data]);

  return (
    <BaseNode
      className={`TextInputNode px-3 pt-1 hover:cursor-text ${linkedStyle} ${className}`}
    >
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleUpdate(e.target.value);
        }}
        type="text"
        placeholder="Lorem ipsum..."
        className={`font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black ${linkedInputStyle} mb-1`}
      />
    </BaseNode>
  );
};
