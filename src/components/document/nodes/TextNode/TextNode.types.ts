import { TextNodeRawData } from "@/types/document.types";

/**
 * TextNode component props.
 *
 * @param {string} className - Custom className.
 * @param {TextNodeRawData} data - Node data.
 * @param {number} rowIndex - Node row index.
 */
export interface TextNodeProps {
  /** Custom className. */
  className?: string;
  /** Node data. */
  data?: TextNodeRawData;
  /** Node row index. */
  rowIndex?: number;
}

export type TextType = "h1" | "h2" | "h3" | "span" | "longText" | "p";
