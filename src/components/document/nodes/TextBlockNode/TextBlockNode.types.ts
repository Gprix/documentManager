import { TextBlockNodeRawData } from "@/types/document.types";
import { NodeSharedProps } from "../BaseNode/BaseNode.types";

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
export interface TextBlockNodeProps extends NodeSharedProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: TextBlockNodeRawData;
  /** Callback function to update node data. */
  onNodeUpdate: (node: TextBlockNodeRawData) => void;
}
