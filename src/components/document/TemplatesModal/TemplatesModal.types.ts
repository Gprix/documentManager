/**
 * TemplatesModal component props.
 *
 * @param {string} className - Custom className.
 * @param {() => void} onClose - Function to close the modal.
 */
export interface TemplatesModalProps {
  /** Custom className. */
  className?: string;
  /** Function to close the modal. */
  onClose: () => void;
}
