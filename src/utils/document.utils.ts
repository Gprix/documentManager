import { DocumentNodeRawData } from "@/types/document.types";

/**
 * Get preview nodes utility
 *
 * @param documentData original document data
 * @param limit limit number of nodes to return
 * @returns DocumentNodeRawData[] array of node raw data
 */
export const getPreviewNodesUtility = (
  documentData: DocumentNodeRawData[],
  limit: number = 10
) =>
  documentData
    .sort((a, b) => a.rowIndex - b.rowIndex)
    .sort((a, b) => a.inlineIndex - b.inlineIndex)
    .slice(0, limit);
