import {
  Document,
  DocumentExportData,
  DocumentNodeRawData,
} from "@/types/document.types";
import { compressData, decompressData } from "./backup.utils";

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

/**
 * Export document utility
 *
 * @param _document document to export
 */
export const exportDocument = (_document: Document, compress?: boolean) => {
  const { title, documentData, documentType } = _document;

  let documentToExport = JSON.stringify({
    title,
    documentData,
    documentType,
  });

  if (compress) {
    documentToExport = compressData(documentToExport);
  }
  const blob = new Blob([documentToExport], {
    type: compress ? "application/docunot" : "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${title}.${compress ? "dcn" : "json"}`;
  link.click();

  URL.revokeObjectURL(url);
};

/**
 * Import document utility
 *
 * @param {File} file file to import (json or dcn)
 * @param {string} to workspace id to import the document to
 * @param {boolean} decompress  whether to decompress the file or not
 */
export const importDocument = async (
  file: File,
  decompress?: boolean
): Promise<DocumentExportData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target) {
        reject(new Error("Failed to read file"));
        return;
      }

      try {
        const documentData: DocumentExportData = decompress
          ? JSON.parse(decompressData(e.target.result as string))
          : JSON.parse(e.target.result as string);

        resolve(documentData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (e) => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};
