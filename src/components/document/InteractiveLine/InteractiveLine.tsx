import { useState } from "react";
import { AddNodeProps, InteractiveLineProps } from "./InteractiveLine.types";
import { BaseNode } from "../nodes/BaseNode/BaseNode";
import { TextBlockNode } from "../nodes/TextBlockNode/TextBlockNode";

export const InteractiveLine = (props: InteractiveLineProps) => {
  const { className = "" } = props;
  const [nodes, setNodes] = useState<React.ReactNode[]>([]);

  const AddNode = (props: AddNodeProps) => {
    const { disabled = false } = props;
    const disabledStyle = disabled ? "opacity-30 hover:cursor-not-allowed" : "";

    const addNodeHandler = () => {
      // setNodes((prevNodes) => [...prevNodes, <BaseNode>a</BaseNode>]);
      setNodes((prevNodes) => [...prevNodes, <TextBlockNode />]);
    };

    return (
      <button
        className={`bg-gray-200 rounded-lg hover:cursor-pointer px-4 min-h-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${disabledStyle}`}
        onClick={() => addNodeHandler()}
      >
        +
      </button>
    );
  };

  return (
    <div
      className={`InteractiveLine flex gap-x-2 border-b-4 hover: border-transparent hover:border-gray-200 transition-colors duration-150 pb-2 group ${className}`}
    >
      {nodes}
      <AddNode />
    </div>
  );
};
