import { NumberInputNodeRawData } from "@/types/document.types";

/**
 * NumberInputNode component props.
 * @interface NumberInputNodeProps
 *
 * @param {string} className - Custom className.
 * @param {NumberInputNodeRawData} data - Node data.
 * @param {number} rowIndex - Node row index.
 * @param {number} inlineIndex - Node inline index.
 * @param {(node: NumberInputNodeRawData) => void} onNodeUpdate - Callback function to update node data.
 */
export interface NumberInputNodeProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: NumberInputNodeRawData;
  /** Node row index. */
  rowIndex: number;
  /** Node inline index. */
  inlineIndex: number;
  /** Callback function to update node data. */
  onNodeUpdate: (node: NumberInputNodeRawData) => void;
}
