/**
 * DocumentView component props.
 *
 * @param {string} className - Custom className.
 * @param {string} documentId - Document id.
 * @param {boolean} isTemplate - If the document is a template.
 */
export interface DocumentViewProps {
  /** Custom className. */
  className?: string;
  /** Document id. */
  documentId: string;
  /** If the document is a template. */
  isTemplate?: boolean;
}
