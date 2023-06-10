export type BackdropStyle = "glass" | "dark" | "none";

export interface ModalProps {
  children: React.ReactNode;
  className?: string;
  backdrop?: BackdropStyle;
  type?: "boxed" | "unboxed";
}

export interface BackdropProps {
  backdrop: BackdropStyle;
  onClick?: () => void;
}
