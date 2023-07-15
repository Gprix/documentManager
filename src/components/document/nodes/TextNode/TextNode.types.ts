import { DocumentNodeRawData, TextNodeRawData } from "@/types/document.types";
import { NodeSharedProps } from "../BaseNode/BaseNode.types";

/**
 * TextNode component props.
 *
 * @param {string} className - Custom className.
 * @param {TextNodeRawData} data - Node data.
 * @param {number} rowIndex - Node row index.
 * @param {(node: DocumentNodeRawData, position: DocumentLineRawDataPosition) => void} onNodeUpdate - Callback function to update node data.
 * @param {number} inlineIndex - Node inline index.
 * @param {(node: DocumentNodeRawData, position: DocumentLineRawDataPosition) => void} onNodeUpdate - Callback function to update node data.
 */
export interface TextNodeProps extends NodeSharedProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: TextNodeRawData;
  /** Callback function to update node data. */
  onNodeUpdate: (node: DocumentNodeRawData) => void;
}

export type TextType = "h1" | "h2" | "h3" | "span" | "longText" | "p";
