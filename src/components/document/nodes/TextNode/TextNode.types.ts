/**
 * TextNode component props.
 *
 * @param {string} className - Custom className.
 */
export interface TextNodeProps {
  /** Custom className. */
  className?: string;
}

export type TextType = "h1" | "h2" | "h3" | "span" | "longText" | "p";
