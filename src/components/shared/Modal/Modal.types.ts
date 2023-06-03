export type Backdrop = "glass" | "dark" | "none";

export interface ModalProps {
  children: React.ReactNode;
  className?: string;
  backdrop?: Backdrop;
  type?: "boxed" | "unboxed";
}

export interface BackdropProps {
  backdrop: Backdrop;
}
