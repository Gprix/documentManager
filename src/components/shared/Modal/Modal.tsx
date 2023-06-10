import { BackdropStyle, BackdropProps, ModalProps } from "./Modal.types";

export const Backdrop = (props: BackdropProps) => {
  const { backdrop = "dark" } = props;
  const { onClick } = props;

  const backdropStyle = (style: BackdropStyle) =>
    ({
      glass: "bg-glass backdrop-blur",
      dark: "bg-focus",
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

const Modal = (props: ModalProps) => {
  const { children, className = "" } = props;
  const { backdrop = "dark", type = "boxed" } = props;

  const boxStyle = type == "boxed" ? "bg-white rounded-2xl" : "";

  return (
    <>
      <Backdrop backdrop={backdrop} />
      <div className="Modal__container z-50 absolute full-screen top-0 left-0">
        <div
          className={`Modal ${boxStyle} m-auto inline-block overflow-clip ${className}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
