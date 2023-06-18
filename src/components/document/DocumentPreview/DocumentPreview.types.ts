import {
  /*Document,*/ DocumentType,
  NodeRawData,
} from "@/types/document.types";

/**
 * DocumentPreview component props.
 *
 * @param {string} className - Custom className.
 * @param {DocumentRawData} previewNodes - Document preview nodes.
 * @param {DocumentType} previewType - Type of document.
 * @param {string} documentName - Name of document.
 * @param {string} documentId - Document id.
 */
export interface DocumentPreviewProps {
  /** Custom className. */
  className?: string;
  /** Document preview nodes. */
  previewNodes: NodeRawData[];
  /** Type of document. */
  documentType: DocumentType;
  /** Name of document. */
  documentName: string;
  /** Document id. */
  documentId: string;
}

// export interface DocumentPreview
//   extends Omit<
//     Document,
//     "title" | "authorId" | "workspaceId" | "documentData"
//   > {
//   title?: string;
//   name?: string;
//   documentData?: NodeRawData[];
//   templateData?: NodeRawData[];
// }

export type DocumentPreview = string[];
