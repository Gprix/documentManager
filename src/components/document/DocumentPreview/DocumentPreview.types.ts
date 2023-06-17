import { DocumentType } from "@/types/document.types";

/**
 * DocumentPreview component props.
 *
 * @param {string} className - Custom className.
 * @param {DocumentRawData} previewNodes - Document preview nodes.
 * @param {DocumentType} previewType - Type of document.
 * @param {string} documentName - Name of document.
 */
export interface DocumentPreviewProps {
  /** Custom className. */
  className?: string;
  /** Document preview nodes. */
  previewNodes: any[];
  /** Type of document. */
  documentType: DocumentType;
  /** Name of document. */
  documentName: string;
}
