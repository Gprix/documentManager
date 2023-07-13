import { InputHTMLAttributes } from "react";

/**
 * Switch component props.
 *
 * @param {string} className - Custom className.
 */
export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Custom className. */
  className?: string;
  label?: string;
  identifier?: string;
}
