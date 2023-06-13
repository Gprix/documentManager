import {
  MouseEvent,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { AddNodeProps, InteractiveLineProps } from "./InteractiveLine.types";
import { TextBlockNode } from "../nodes/TextBlockNode/TextBlockNode";
import { SecondaryMenu } from "@/components/shared/SecondaryMenu/SecondaryMenu";
import { TextInputNode } from "../nodes/TextInputNode/TextInputNode";
import { NumberInputNode } from "../nodes/NumberInputNode/NumberInputNode";
import { TextNode } from "../nodes/TextNode/TextNode";
import {
  DocumentNodeRawData,
  NodeTypes,
  NumberInputNodeRawData,
  TextBlockNodeRawData,
  TextInputNodeRawData,
  TextNodeRawData,
} from "@/types/document.types";

const InteractiveLine = forwardRef<HTMLDivElement, InteractiveLineProps>(
  (props, ref) => {
    const { className = "" } = props;
    const { data, orderIndex } = props;
    const [nodes, setNodes] = useState<React.ReactNode[]>([]);

    const bindNode = useCallback(
      (nodeData: DocumentNodeRawData | undefined, actionType?: NodeTypes) => {
        const { type, rowIndex, inlineIndex } = nodeData ?? {};

        switch (type ?? actionType) {
          case "text":
            setNodes((prevNodes) => [
              ...prevNodes,
              <TextNode
                rowIndex={!!type ? rowIndex : orderIndex}
                data={nodeData as TextNodeRawData}
                key={`text-node-${inlineIndex}-${rowIndex}`}
              />,
            ]);
            break;

          case "textBlock":
            setNodes((prevNodes) => [
              ...prevNodes,
              <TextBlockNode
                rowIndex={!!type ? rowIndex : orderIndex}
                data={nodeData as TextBlockNodeRawData}
                key={`text-block-node-${inlineIndex}-${rowIndex}`}
              />,
            ]);
            break;

          case "textInput":
            setNodes((prevNodes) => [
              ...prevNodes,
              <TextInputNode
                rowIndex={!!type ? rowIndex : orderIndex}
                data={nodeData as TextInputNodeRawData}
                key={`text-input-node-${inlineIndex}-${rowIndex}`}
              />,
            ]);
            break;

          case "numberInput":
            setNodes((prevNodes) => [
              ...prevNodes,
              <NumberInputNode
                rowIndex={!!type ? rowIndex : orderIndex}
                data={nodeData as NumberInputNodeRawData}
                key={`number-input-node-${inlineIndex}-${rowIndex}`}
              />,
            ]);
            break;
        }
      },
      [orderIndex]
    );

    useLayoutEffect(() => {
      if (!data) return;

      data.map((node) => {
        bindNode(node);
      });
    }, [bindNode, data]);

    const secondaryMenuOptions: { name: string; actionType: NodeTypes }[] = [
      {
        name: "Nodo de texto",
        actionType: "text",
      },
      {
        name: "Insertar bloque de texto",
        actionType: "textBlock",
      },
      {
        name: "Entrada de texto",
        actionType: "textInput",
      },
      {
        name: "Entrada de número",
        actionType: "numberInput",
      },
    ];

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
                  const { name, actionType } = option;

                  return (
                    <li key={name}>
                      <button
                        className="w-full block px-3 py-2 first:pt-2 last:pb-2 only:py-2 text-left hover:cursor-pointer hover:bg-gray-200 transition-colors duration-150"
                        onClick={() => bindNode(undefined, actionType)}
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
        className={`InteractiveLine flex gap-x-2 shadow-gray-200 hover:shadow-transparent transition-colors duration-150 pb-2 group ${className}`}
      >
        {nodes}
        <AddNode />
      </div>
    );
  }
);

InteractiveLine.displayName = "InteractiveLine";

export default InteractiveLine;
