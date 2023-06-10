import { BaseNode } from "../BaseNode/BaseNode";
import { TextNodeProps } from "./TextNode.types";

export const TextNode = (props: TextNodeProps) => {
  const { className = "" } = props;

  return (
    <BaseNode className={`TextNode flex pl-2 pr-3 pt-1 ${className}`}>
      <button className="text-sm mr-2 bg-transparent hover:bg-gray-100 hover:cursor-pointer rounded-lg px-2 pt-1 mb-1 text-gray-500">
        h1
      </button>
      <input
        type="text"
        value={"Lorem ipsum"}
        className="font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black mb-1"
      />
    </BaseNode>
  );
};
