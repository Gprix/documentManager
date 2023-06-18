import { DocumentNodeRawData } from "@/types/document.types";

export const getPreviewNodesUtility = (
  documentData: DocumentNodeRawData[],
  limit: number = 10
) =>
  documentData
    .sort((a, b) => a.rowIndex - b.rowIndex)
    .sort((a, b) => a.inlineIndex - b.inlineIndex)
    .slice(0, limit);
