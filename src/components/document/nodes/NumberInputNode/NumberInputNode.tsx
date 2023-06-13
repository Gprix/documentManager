import { useLayoutEffect, useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { NumberInputNodeProps } from "./NumberInputNode.types";

export const NumberInputNode = (props: NumberInputNodeProps) => {
  const { className = "" } = props;
  const { data, rowIndex } = props;
  const [value, setValue] = useState(0);
  const [_linkingKey, setLinkingKey] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!data) return;

    const { linkedTo, value } = data;
    setValue(value);
    setLinkingKey(linkedTo);
  }, [data]);

  return (
    <BaseNode
      className={`NumberInputNode px-3 pt-1 hover:cursor-text ${className}`}
    >
      <input
        onChange={(e) => setValue(parseInt(e.target.value))}
        value={value}
        type="number"
        placeholder="123..."
        className="font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black mb-1"
      />
    </BaseNode>
  );
};
