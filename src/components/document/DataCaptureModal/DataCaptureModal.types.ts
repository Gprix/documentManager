/**
 * DataCaptureModal component props.
 *
 * @param {string} className - Custom className.
 * @param {() => void} onClose - Callback to close the modal.
 */
export interface DataCaptureModalProps {
  /** Custom className. */
  className?: string;
  /** Callback to close the modal. */
  onClose: () => void;
}
