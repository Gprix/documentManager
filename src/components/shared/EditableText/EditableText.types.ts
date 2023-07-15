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
}

export interface EditableTextRef {
  getTitle: () => string;
}
