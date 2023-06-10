/**
 * SecondaryMenu component props.
 *
 * @param {React.ReactNode} children - Children.
 * @param {string} className - Custom className.
 * @param {number} top - Top position.
 * @param {number} bottom - Bottom position.
 * @param {number} left - Left position.
 * @param {number} right - Right position.
 * @param {() => void} onDismiss - On dismiss callback.
 */
export interface SecondaryMenuProps {
  /** Children. */
  children?: React.ReactNode;
  /** Custom className. */
  className?: string;
  /** Top position. */
  top?: number;
  /** Bottom position. */
  bottom?: number;
  /** Left position. */
  left?: number;
  /** Right position. */
  right?: number;
  /** On dismiss callback. */
  onDismiss: () => void;
}
