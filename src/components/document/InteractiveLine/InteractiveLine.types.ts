import { DocumentLineRawData } from "@/types/document.types";
import { DocumentNodeRawData } from "../../../types/document.types";

/**
 * InteractiveLine component props.
 * @interface InteractiveLineProps
 *
 * @param {string} className - Custom className.
 * @param {DocumentLineRawData[]} data - Line data.
 * @param {number} orderIndex - Line order index.
 * @param {(node: DocumentNodeRawData, position: DocumentLineRawDataPosition) => void} onNodeUpdate - Callback function to update node data.
 */
export interface InteractiveLineProps {
  /** Custom className. */
  className?: string;
  /** Line data. */
  data?: DocumentLineRawData;
  /** Line order index. */
  orderIndex: number;
  /** Callback function to update node data. */
  onNodeUpdate: (node: DocumentNodeRawData) => void;
  isEditable?: boolean;
}

/**
 * AddNode component props.
 * @interface AddNodeProps
 *
 * @param {boolean} disabled - If true, the button will be disabled.
 */
export interface AddNodeProps {
  /** If true, the button will be disabled. */
  disabled?: boolean;
}
