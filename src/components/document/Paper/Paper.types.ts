import { Document } from "@/types/document.types";

/**
 * Paper component props.
 * @interface PaperProps
 *
 * @param {string} className - Custom className.
 * @param {Document} data - Document data.
 */
export interface PaperProps {
  /** Custom className. */
  className?: string;
  /** Document data. */
  document?: Document;
}
