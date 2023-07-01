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
    .sort((a, b) => {
      if (a.rowIndex === b.rowIndex) {
        return a.inlineIndex - b.inlineIndex; // Sort by inlineIndex if rowIndex is the same
      }
      return a.rowIndex - b.rowIndex; // Sort by rowIndex
    })
    .slice(0, limit);
