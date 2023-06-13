import { BaseNode } from "../BaseNode/BaseNode";
import { NumberInputNodeProps } from "./NumberInputNode.types";

export const NumberInputNode = (props: NumberInputNodeProps) => {
  const { className = "" } = props;

  return (
    <BaseNode
      className={`NumberInputNode px-3 pt-1 hover:cursor-text ${className}`}
    >
      <input
        type="number"
        placeholder="123..."
        className="font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black mb-1"
      />
    </BaseNode>
  );
};
