import { Backdrop, BackdropProps, ModalProps } from "./Modal.types";

const Backdrop = (props: BackdropProps) => {
  const { backdrop = "dark" } = props;

  const backdropStyle = (style: Backdrop) =>
    ({
      glass: "bg-glass",
      dark: "bg-focus",
      none: "bg-transparent",
    }[style]);

  return backdrop !== "none" ? (
    <div
      className={`Backdrop ${backdropStyle(
        backdrop
      )} backdrop-blur z-40 full-screen overflow-hidden absolute top-0 left-0`}
    />
  ) : null;
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
