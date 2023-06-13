import { TextBlockNodeRawData } from "@/types/document.types";

/**
 * TextBlockNode component props.
 * @interface TextBlockNodeProps
 *
 * @param {string} className - Custom className.
 * @param {TextBlockNodeRawData} data - Node data.
 * @param {number} rowIndex - Node row index.
 */
export interface TextBlockNodeProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: TextBlockNodeRawData;
  /** Node row index. */
  rowIndex?: number;
}
