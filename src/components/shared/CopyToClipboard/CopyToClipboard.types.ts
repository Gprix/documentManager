import { RefObject } from "react";

export interface CopyToClipboardProps {
  className?: string;
  targetRef?: RefObject<HTMLElement>;
  text?: string;
}
