"use client";

import { MouseEvent, useState } from "react";
import { ToolboxTopButtonProps } from "./ToolboxTopButton.types";
import { SecondaryMenu } from "@/components/shared/SecondaryMenu/SecondaryMenu";

export const ToolboxTopButton = (props: ToolboxTopButtonProps) => {
  const { children, contextMenuConfiguration } = props;
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    setOrigin({ x: e.pageX, y: e.pageY });
    setShowSecondaryMenu(true);
  };

  return (
    <>
      <button onClick={(e) => handleUpdate(e)}>{children}</button>
      {showSecondaryMenu ? (
        <SecondaryMenu
          top={origin.y + 10}
          left={origin.x - 140}
          onDismiss={() => setShowSecondaryMenu(false)}
        >
          <ul role="listbox">
            {contextMenuConfiguration.map((option) => {
              const { label, action } = option;

              const actionHandler = () => {
                action();
                setShowSecondaryMenu(false);
              };

              return (
                <li key={label}>
                  <button
                    className="context-menu__item"
                    onClick={actionHandler}
                  >
                    {label}
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
