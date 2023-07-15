import { NodeRawData } from "@/types/document.types";

/**
 * BaseNode component props.
 * @interface BaseNodeProps
 *
 * @param {string} className - Custom className.
 * @param {NodeRawData} data - Node data.
 */
export interface BaseNodeProps {
  children?: React.ReactNode;
  /** Custom className. */
  className?: string;
  /** Custom className for inner content */
  contentClassName?: string;
  /** Node data. */
  data?: NodeRawData;
  /** Is node editable. */
  editable?: boolean;
}

export interface NodeSharedProps {
  /** Node row index. */
  rowIndex: number;
  /** Node inline index. */
  inlineIndex: number;
  /** Is node editable. */
  editable?: boolean;
}
