"use client";

import { MouseEvent, useLayoutEffect, useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { TextNodeProps } from "./TextNode.types";
import { SecondaryMenu } from "@/components/shared/SecondaryMenu/SecondaryMenu";
import { TextType } from "./TextNode.types";
import { useDocument } from "@/contexts/document/document.context.hooks";

export const TextNode = (props: TextNodeProps) => {
  const { className = "" } = props;
  const { data, rowIndex, inlineIndex, onNodeUpdate } = props;
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const [nodeStyle, setNodeStyle] = useState<TextType>("span");
  const [value, setValue] = useState("");
  const { selectedDocument } = useDocument();

  useLayoutEffect(() => {
    if (!selectedDocument) return;
  }, [selectedDocument]);

  const secondaryMenuOptions = [
    {
      name: "Título",
      action: () => setNodeStyle("h1"),
    },
    {
      name: "Subtítulo",
      action: () => setNodeStyle("h2"),
    },
    {
      name: "Sección",
      action: () => setNodeStyle("h3"),
    },
    {
      name: "Texto",
      action: () => setNodeStyle("span"),
    },
    {
      name: "Texto largo",
      action: () => setNodeStyle("longText"),
    },
    {
      name: "Párrafo",
      action: () => setNodeStyle("p"),
    },
  ];

  const changeStyleHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setOrigin({ x: e.pageX, y: e.pageY });
    setShowSecondaryMenu(true);
  };

  // Retrieve and set data
  useLayoutEffect(() => {
    if (!data) return;

    const { style, value } = data;
    setNodeStyle(style);
    setValue(value);
  }, [data]);

  const handleUpdate = (updatedValue: string) => {
    if (!onNodeUpdate) return;
    if (!selectedDocument) return;

    onNodeUpdate({
      inlineIndex,
      rowIndex,
      isFullLine: false,
      type: "text",
      style: nodeStyle,
      value: updatedValue,
    });
  };

  return (
    <>
      <BaseNode
        className="TextNode"
        contentClassName={["pl-2 pr-3 pt-1 flex", className].join(" ")}
      >
        <button
          onClick={(e) => changeStyleHandler(e)}
          className="block text-sm mr-2 bg-transparent hover:bg-gray-100 hover:cursor-pointer w-0 opacity-0 group-hover:opacity-100 group-hover:w-auto transition-opacity rounded-lg px-2 pt-1 mb-1 text-gray-500"
        >
          {nodeStyle}
        </button>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleUpdate(e.target.value);
          }}
          type="text"
          placeholder="Lorem ipsum..."
          className="block font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black mb-1"
        />
      </BaseNode>
      {showSecondaryMenu ? (
        <SecondaryMenu
          top={origin.y}
          left={origin.x - 140}
          onDismiss={() => setShowSecondaryMenu(false)}
        >
          <ul role="listbox">
            {secondaryMenuOptions.map((option) => {
              const { name, action } = option;

              const actionHandler = () => {
                action();
                setShowSecondaryMenu(false);
              };

              return (
                <li key={name}>
                  <button
                    className="context-menu__item"
                    onClick={() => actionHandler()}
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
