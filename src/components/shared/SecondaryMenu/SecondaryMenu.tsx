"use client";

import { useState } from "react";
import { SecondaryMenuProps } from "./SecondaryMenu.types";
import { Backdrop } from "../Modal/Modal";

export const SecondaryMenu = (props: SecondaryMenuProps) => {
  const { children, className = "" } = props;
  const { top, bottom, left, right } = props;
  const { onDismiss } = props;
  const [mouseIsOutside, setMouseIsOutside] = useState(false);

  const positionTop = top ? { top: `${top}px` } : null;
  const positionBottom = bottom ? { bottom: `${bottom}px` } : null;
  const positionLeft = left ? { left: `${left}px` } : null;
  const positionRight = right ? { right: `${right}px` } : null;

  const clickHandler = () => {
    if (mouseIsOutside) onDismiss();
  };

  return (
    <>
      <Backdrop backdrop="none" onClick={() => onDismiss()} />
      <div
        style={{
          ...positionTop,
          ...positionBottom,
          ...positionLeft,
          ...positionRight,
        }}
        className={`SecondaryMenu bg-gray-50 rounded-lg z-[60] absolute shadow-md overflow-clip ${className}`}
        onMouseEnter={() => setMouseIsOutside(false)}
        onMouseLeave={() => setMouseIsOutside(true)}
        onClick={() => clickHandler()}
      >
        {children}
      </div>
    </>
  );
};
