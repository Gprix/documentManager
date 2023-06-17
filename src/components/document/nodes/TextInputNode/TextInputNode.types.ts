import { TextInputNodeRawData } from "@/types/document.types";

/**
 * TextInputNode component props.
 *
 * @param {string} className - Custom className.
 * @param {TextInputNodeRawData} data - Node data.
 * @param {number} rowIndex - Node row index.
 * @param {number} inlineIndex - Node inline index.
 * @param {(node: TextInputNodeRawData) => void} onNodeUpdate - Callback function to update node data.
 */
export interface TextInputNodeProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: TextInputNodeRawData;
  /** Node row index. */
  rowIndex: number;
  /** Node inline index. */
  inlineIndex: number;
  /** Callback function to update node data. */
  onNodeUpdate: (node: TextInputNodeRawData) => void;
}
