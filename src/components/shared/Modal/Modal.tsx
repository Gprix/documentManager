import { useState } from "react";
import { BackdropStyle, BackdropProps, ModalProps } from "./Modal.types";

export const Backdrop = (props: BackdropProps) => {
  const { backdrop = "dark" } = props;
  const { onClick } = props;

  const backdropStyle = (style: BackdropStyle) =>
    ({
      glass: "bg-glass backdrop-blur hover:cursor-pointer",
      dark: "bg-focus hover:cursor-pointer",
      none: "bg-transparent",
    }[style]);

  return (
    <div
      onClick={onClick}
      className={`Backdrop ${backdropStyle(
        backdrop
      )} z-40 full-screen overflow-hidden absolute top-0 left-0`}
    />
  );
};

export const Modal = (props: ModalProps) => {
  const { children, className = "" } = props;
  const { backdrop = "dark", type = "boxed" } = props;
  const { onClose /*onBackdropClick*/ } = props;
  const [_mouseIsOutside, setMouseIsOutside] = useState(false);

  const boxStyle = type == "boxed" ? "bg-white rounded-2xl" : "";

  return (
    <>
      <Backdrop backdrop={backdrop} onClick={() => onClose()} />
      <div
        className={`Modal ${boxStyle} absolute z-50 m-auto inline-block overflow-clip ${className}`}
        onMouseEnter={() => setMouseIsOutside(false)}
        onMouseLeave={() => setMouseIsOutside(true)}
      >
        {children}
      </div>
    </>
  );
};
