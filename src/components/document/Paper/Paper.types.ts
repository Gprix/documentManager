import { Document } from "@/types/document.types";

/**
 * Paper component props.
 * @interface PaperProps
 *
 * @param {string} className - Custom className.
 * @param {Document} data - Document data.
 * @param {boolean} editable - Document is editable.
 */
export interface PaperProps {
  /** Custom className. */
  className?: string;
  /** Document data. */
  document?: Document;
  /** Document is editable. */
  editable?: boolean;
}
