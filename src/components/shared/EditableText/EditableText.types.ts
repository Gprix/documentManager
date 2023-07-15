/**
 * EditableText component props.
 *
 * @param {string} className - Custom className.
 */
export interface EditableTextProps {
  /** Custom className. */
  className?: string;
  /** Text to be displayed. */
  text: string;
  /** Custom className for the input. */
  inputClassName?: string;
  /** Extra callback to be executed when the text changes. */
  additionalAction?: () => void;
}

export interface EditableTextRef {
  getTitle: () => string;
}
