export type ButtonType = "solid" | "outline";

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  leftIcon?: any;
  rightIcon?: any;
  onClick?: () => void;
  type?: ButtonType;
  textStyle?: string;
}
