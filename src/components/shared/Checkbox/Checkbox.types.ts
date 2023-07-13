import { InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  identifier: string;
  customOnChange?: (identifier: string, checked: boolean) => void;
}
