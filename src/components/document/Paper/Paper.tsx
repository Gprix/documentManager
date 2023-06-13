"use client";

import { PaperProps } from "./Paper.types";
import InteractiveLine from "../InteractiveLine/InteractiveLine";
import { useLayoutEffect, useState } from "react";
import { DocumentLineRawData } from "@/types/document.types";

export const Paper = (props: PaperProps) => {
  const { className = "" } = props;
  const { document } = props;
  const { documentData } = document ?? {};
  const { documentLines } = documentData ?? {};
  const [lines, setLines] = useState<React.ReactNode[]>([]);

  const bindLine = (lineData: DocumentLineRawData | undefined) => {
    setLines((prevLines) => [
      ...prevLines,
      <InteractiveLine
        orderIndex={prevLines.length}
        data={lineData}
        key={`line-${prevLines.length}`}
      />,
    ]);
  };

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

  useLayoutEffect(() => {
    if (!documentLines) return;

    documentLines?.map((line) => {
      bindLine(line);
    });
  }, [documentLines]);

  return (
    <article
      className={`Paper flex flex-col gap-y-2 bg p-6 rounded-lg ${className}`}
    >
      {lines.map((line) => line)}
      <AddLine />
    </article>
  );
};
