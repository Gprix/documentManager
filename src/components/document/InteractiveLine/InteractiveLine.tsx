import { MouseEvent, forwardRef, useEffect, useState } from "react";
import { AddNodeProps, InteractiveLineProps } from "./InteractiveLine.types";
import { TextBlockNode } from "../nodes/TextBlockNode/TextBlockNode";
import { SecondaryMenu } from "@/components/shared/SecondaryMenu/SecondaryMenu";
import { TextInputNode } from "../nodes/TextInputNode/TextInputNode";
import { NumberInputNode } from "../nodes/NumberInputNode/NumberInputNode";
import { TextNode } from "../nodes/TextNode/TextNode";
import { convertToJSON } from "@/utils/document.utils";

const InteractiveLine = forwardRef<HTMLDivElement, InteractiveLineProps>(
  (props, ref) => {
    const { className = "" } = props;
    const [nodes, setNodes] = useState<React.ReactNode[]>([]);
    const [nodesRawData, setNodesRawData] = useState<any[]>();

    const secondaryMenuOptions = [
      {
        name: "Nodo de texto",
        action: () =>
          setNodes((prevNodes) => [
            ...prevNodes,
            <TextNode key="option-text" />,
          ]),
      },
      {
        name: "Insertar bloque de texto",
        action: () =>
          setNodes((prevNodes) => [
            ...prevNodes,
            <TextBlockNode key="option-text-block" />,
          ]),
      },
      {
        name: "Entrada de texto",
        action: () =>
          setNodes((prevNodes) => [
            ...prevNodes,
            <TextInputNode key="option-text-input" />,
          ]),
      },
      {
        name: "Entrada de número",
        action: () =>
          setNodes((prevNodes) => [
            ...prevNodes,
            <NumberInputNode key="option-number-input" />,
          ]),
      },
    ];

    useEffect(() => {
      setNodesRawData(nodes.map((node) => convertToJSON(node)));
    }, [nodes]);

    const AddNode = (props: AddNodeProps) => {
      const { disabled = false } = props;
      const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
      const [origin, setOrigin] = useState({ x: 0, y: 0 });

      const disabledStyle = disabled
        ? "opacity-30 hover:cursor-not-allowed"
        : "";

      const addNodeHandler = (e: MouseEvent<HTMLButtonElement>) => {
        setOrigin({ x: e.pageX, y: e.pageY });
        setShowSecondaryMenu(true);
      };

      return (
        <>
          <button
            className={`bg-gray-200 rounded-lg hover:cursor-pointer px-4 min-h-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${disabledStyle}`}
            onClick={(e) => addNodeHandler(e)}
          >
            +
          </button>
          {showSecondaryMenu ? (
            <SecondaryMenu
              top={origin.y}
              left={origin.x}
              onDismiss={() => setShowSecondaryMenu(false)}
            >
              <ul role="listbox">
                {secondaryMenuOptions.map((option) => {
                  const { name, action } = option;

                  return (
                    <li key={name}>
                      <button
                        className="w-full block px-3 py-2 first:pt-2 last:pb-2 only:py-2 text-left hover:cursor-pointer hover:bg-gray-200 transition-colors duration-150"
                        onClick={action}
                      >
                        {name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </SecondaryMenu>
          ) : null}
        </>
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
  }
);

InteractiveLine.displayName = "InteractiveLine";

export default InteractiveLine;
