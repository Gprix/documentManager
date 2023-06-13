import { NumberInputNodeRawData } from "@/types/document.types";

/**
 * NumberInputNode component props.
 * @interface NumberInputNodeProps
 *
 * @param {string} className - Custom className.
 * @param {NumberInputNodeRawData} data - Node data.
 * @param {number} rowIndex - Node row index.
 */
export interface NumberInputNodeProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: NumberInputNodeRawData;
  /** Node row index. */
  rowIndex?: number;
}
