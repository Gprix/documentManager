"use client";

import { PaperProps } from "./Paper.types";
import InteractiveLine from "../InteractiveLine/InteractiveLine";
import { useCallback, useLayoutEffect, useState } from "react";
import {
  DocumentLineRawData,
  DocumentLineRawDataPosition,
  DocumentNodeRawData,
  DocumentRawData,
} from "@/types/document.types";
import { useDocument } from "@/contexts/document/document.context.hooks";

export const Paper = (props: PaperProps) => {
  const { className = "" } = props;
  const { document } = props;
  const { selectedDocument, setSelectedDocument } = useDocument();
  const { documentData } = document ?? {};
  const [lines, setLines] = useState<React.ReactNode[]>([]);

  const onNodeUpdate = useCallback(
    (
      updatedNodeData: DocumentNodeRawData,
      updatedNodePosition: DocumentLineRawDataPosition
    ) => {
      if (!selectedDocument) return;

      const oldDocumentState = { ...selectedDocument };
      const { documentData: oldDocumentData } = oldDocumentState ?? {};

      // initialize document (raw) data
      if (oldDocumentData === null) {
        const newDocumentData: DocumentRawData = {
          documentLines: [],
        };
        setSelectedDocument({
          ...oldDocumentState,
          documentData: newDocumentData,
        });
      }

      const docLines = oldDocumentData?.documentLines ?? [];

      const newDocumentData = {
        ...oldDocumentState,
        documentData: {
          ...oldDocumentState.documentData,
          documentLines: [
            ...docLines,
            [
              {
                ...updatedNodeData,
              },
            ],
          ],
        },
      };

      setSelectedDocument(newDocumentData);
    },
    [selectedDocument, setSelectedDocument]
  );

  const bindLine = useCallback(
    (lineData: DocumentLineRawData | undefined) => {
      setLines((prevLines) => [
        ...prevLines,
        <InteractiveLine
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

  // Map document data lines to node lines
  useLayoutEffect(() => {
    if (documentData === undefined || documentData === null) return;
    const { documentLines } = documentData;

    documentLines?.map((line) => {
      bindLine(line);
    });
  }, [bindLine, documentData]);

  return (
    <article
      className={`Paper flex flex-col gap-y-2 bg p-6 rounded-lg ${className}`}
    >
      {lines.map((line) => line)}
      <AddLine />
    </article>
  );
};
