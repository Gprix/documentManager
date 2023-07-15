"use client";

import { PaperProps } from "./Paper.types";
import InteractiveLine from "../InteractiveLine/InteractiveLine";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { DocumentLineRawData } from "@/types/document.types";
import { Document, DocumentNodeRawData } from "@/types/document.types";
import { useDocument } from "@/contexts/document/document.context.hooks";

export const Paper = (props: PaperProps) => {
  const { className = "" } = props;
  const { document, isEditing = true } = props;
  const { setSelectedDocument } = useDocument();
  const { documentData: documentDataProps } = document ?? {};
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const isMounted = useRef(false);

  const onNodeUpdate = useCallback(
    (updatedNodeData: DocumentNodeRawData) => {
      setSelectedDocument((prevDocument) => {
        if (!prevDocument) return prevDocument;
        const { documentData: oldDocumentData } = prevDocument;
        if (oldDocumentData === undefined) return prevDocument;

        const isFirstUpdate =
          prevDocument.documentData.length === 0 &&
          oldDocumentData.length === 0;

        if (isFirstUpdate) {
          const newDocument: Document = {
            ...prevDocument,
            documentData: [updatedNodeData],
          };
          return newDocument;
        }

        const newDocumentData = [updatedNodeData];

        const resultDocumentData = oldDocumentData
          ? oldDocumentData
              .map((node) => {
                const { rowIndex, inlineIndex } = node;
                const matchNode = newDocumentData.find(
                  (item) =>
                    item.rowIndex === rowIndex &&
                    item.inlineIndex === inlineIndex
                );
                return matchNode || node;
              })
              .concat(
                newDocumentData.filter(
                  (item) =>
                    !oldDocumentData.find(
                      (node) =>
                        item.rowIndex === node.rowIndex &&
                        item.inlineIndex === node.inlineIndex
                    )
                )
              )
          : newDocumentData;

        const newDocument: Document = {
          ...prevDocument,
          documentData: resultDocumentData,
        };

        return newDocument;
      });
    },
    [setSelectedDocument]
  );

  /**
   * Callback to instance a new interactive line
   */
  const bindLine = useCallback(
    (lineData: DocumentLineRawData | undefined) => {
      setLines((prevLines) => [
        ...prevLines,
        <InteractiveLine
          isEditable={isEditing}
          orderIndex={prevLines.length}
          data={lineData}
          key={`line-${prevLines.length}`}
          onNodeUpdate={onNodeUpdate}
        />,
      ]);
    },
    [onNodeUpdate]
  );

  const AddLine = () => {
    return (
      <button
        onClick={() => bindLine(undefined)}
        className="bg-gray-200 hover:bg-gray-300 text-black rounded-lg hover:cursor-pointer px-4 min-h-[32px] transition-color duration-150"
      >
        +
      </button>
    );
  };

  // Map document data lines to node lines (initial render)
  useLayoutEffect(() => {
    if (isMounted.current) return;
    if (!documentDataProps) return;

    const sortedNodes = [...documentDataProps].sort(
      (a, b) => a.inlineIndex - b.inlineIndex
    );

    const groupedLines: { rowIndex: number; nodes: DocumentNodeRawData[] }[] =
      [];

    sortedNodes.forEach((nodeData) => {
      const { rowIndex } = nodeData;

      // Find the line with the matching rowIndex
      const lineIndex = groupedLines.findIndex(
        (lineData) => lineData.rowIndex === rowIndex
      );

      if (lineIndex === -1) {
        // Line doesn't exist, create a new line data
        groupedLines.push({
          rowIndex,
          nodes: [nodeData],
        });
      } else {
        // Line exists, add the node data to the existing line
        groupedLines[lineIndex].nodes.push(nodeData);
      }
    });

    // Bind lines and nodes based on the data
    groupedLines.forEach((lineData) => {
      lineData.nodes.sort((a, b) => a.inlineIndex - b.inlineIndex);
      bindLine(lineData.nodes);
    });

    isMounted.current = true;
  }, [documentDataProps, bindLine]);

  return (
    <article
      className={`Paper flex flex-col gap-y-2 bg p-6 rounded-lg ${className}`}
    >
      {lines.map((line) => line)}
      {isEditing ? <AddLine /> : null}
    </article>
  );
};
