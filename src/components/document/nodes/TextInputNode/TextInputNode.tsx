import { useLayoutEffect, useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { TextInputNodeProps } from "./TextInputNode.types";

export const TextInputNode = (props: TextInputNodeProps) => {
  const { className = "" } = props;
  const { data, rowIndex } = props;
  const [value, setValue] = useState("");
  const [_linkingKey, setLinkingKey] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!data) return;

    const { linkedTo, value } = data;
    setValue(value);
    setLinkingKey(linkedTo);
  }, [data]);

  return (
    <BaseNode
      className={`TextInputNode px-3 pt-1 hover:cursor-text ${className}`}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Lorem ipsum..."
        className="font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black mb-1"
      />
    </BaseNode>
  );
};
