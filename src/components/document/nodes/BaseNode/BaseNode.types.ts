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
}
