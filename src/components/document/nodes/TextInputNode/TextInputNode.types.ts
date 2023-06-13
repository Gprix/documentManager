import { TextInputNodeRawData } from "@/types/document.types";

/**
 * TextInputNode component props.
 *
 * @param {string} className - Custom className.
 * @param {TextInputNodeRawData} data - Node data.
 * @param {number} rowIndex - Node row index.
 */
export interface TextInputNodeProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: TextInputNodeRawData;
  /** Node row index. */
  rowIndex?: number;
}
