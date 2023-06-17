import { TextBlockNodeRawData } from "@/types/document.types";

/**
 * TextBlockNode component props.
 * @interface TextBlockNodeProps
 *
 * @param {string} className - Custom className.
 * @param {TextBlockNodeRawData} data - Node data.
 * @param {number} rowIndex - Node row index.
 * @param {number} inlineIndex - Node inline index.
 * @param {(node: TextBlockNodeRawData) => void} onNodeUpdate - Callback function to update node data.
 */
export interface TextBlockNodeProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: TextBlockNodeRawData;
  /** Node row index. */
  rowIndex: number;
  /** Node inline index. */
  inlineIndex: number;
  /** Callback function to update node data. */
  onNodeUpdate: (node: TextBlockNodeRawData) => void;
}
