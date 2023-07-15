import { NumberInputNodeRawData } from "@/types/document.types";
import { NodeSharedProps } from "../BaseNode/BaseNode.types";

/**
 * NumberInputNode component props.
 * @interface NumberInputNodeProps
 *
 * @param {string} className - Custom className.
 * @param {NumberInputNodeRawData} data - Node data.
 * @param {(node: NumberInputNodeRawData) => void} onNodeUpdate - Callback function to update node data.
 */
export interface NumberInputNodeProps extends NodeSharedProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: NumberInputNodeRawData;
  /** Callback function to update node data. */
  onNodeUpdate: (node: NumberInputNodeRawData) => void;
}
