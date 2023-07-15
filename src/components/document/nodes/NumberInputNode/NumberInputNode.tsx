import { useLayoutEffect, useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { NumberInputNodeProps } from "./NumberInputNode.types";
import { useDocument } from "@/contexts/document/document.context.hooks";

export const NumberInputNode = (props: NumberInputNodeProps) => {
  const { className = "" } = props;
  const { data, rowIndex, inlineIndex, onNodeUpdate } = props;
  const { selectedDocument } = useDocument();
  const [value, setValue] = useState(0);
  const [linkingKey, setLinkingKey] = useState<string | null>(null);

  const handleUpdate = (updatedValue: number) => {
    if (!onNodeUpdate) return;
    if (!selectedDocument) return;

    onNodeUpdate({
      rowIndex,
      inlineIndex,
      isFullLine: false,
      type: "numberInput",
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
      className="NumberInputNode"
      contentClassName={["px-3 pt-1 hover:cursor-text", className].join(" ")}
    >
      <input
        onChange={(e) => {
          setValue(+e.target.value);
          handleUpdate(+e.target.value);
        }}
        value={value}
        type="number"
        placeholder="123..."
        className="font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black mb-1"
      />
    </BaseNode>
  );
};
