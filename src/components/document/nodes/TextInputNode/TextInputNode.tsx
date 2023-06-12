import { BaseNode } from "../BaseNode/BaseNode";
import { TextInputNodeProps } from "./TextInputNode.types";

export const TextInputNode = (props: TextInputNodeProps) => {
  const { className = "" } = props;

  return (
    <BaseNode
      className={`TextInputNode px-3 pt-1 hover:cursor-text ${className}`}
    >
      <input
        type="text"
        placeholder="Lorem ipsum..."
        className="font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black mb-1"
      />
    </BaseNode>
  );
};
