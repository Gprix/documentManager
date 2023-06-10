"use client";

import { MouseEvent, useState } from "react";
import { BaseNode } from "../BaseNode/BaseNode";
import { TextNodeProps } from "./TextNode.types";
import { SecondaryMenu } from "@/components/shared/SecondaryMenu/SecondaryMenu";
import { TextType } from "./TextNode.types";

export const TextNode = (props: TextNodeProps) => {
  const { className = "" } = props;
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const [nodeStyle, setNodeStyle] = useState<TextType>("h1");

  const secondaryMenuOptions = [
    {
      name: "(h1) Título",
      action: () => setNodeStyle("h1"),
    },
    {
      name: "(p) Párrafo",
      action: () => setNodeStyle("p"),
    },
  ];

  const changeStyleHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setOrigin({ x: e.pageX, y: e.pageY });
    setShowSecondaryMenu(true);
  };

  return (
    <>
      <BaseNode className={`TextNode flex pl-2 pr-3 pt-1 ${className}`}>
        <button
          onClick={(e) => changeStyleHandler(e)}
          className="text-sm mr-2 bg-transparent hover:bg-gray-100 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity rounded-lg px-2 pt-1 mb-1 text-gray-500"
        >
          {nodeStyle}
        </button>
        <input
          type="text"
          placeholder="Lorem ipsum..."
          className="font-light text-black text-sm no-focus-outline w-full bg-transparent border-b border-black mb-1"
        />
      </BaseNode>
      {showSecondaryMenu ? (
        <SecondaryMenu
          top={origin.y}
          left={origin.x}
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
                    className="w-full block px-3 py-2 first:pt-2 last:pb-2 only:py-2 text-left hover:cursor-pointer hover:bg-gray-200 transition-colors duration-150"
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
