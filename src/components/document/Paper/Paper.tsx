"use client";

import { PaperProps } from "./Paper.types";
import InteractiveLine from "../InteractiveLine/InteractiveLine";
import { useState } from "react";

export const Paper = (props: PaperProps) => {
  const { className = "" } = props;
  const [lines, setLines] = useState<React.ReactNode[]>([]);

  const AddLine = () => {
    return (
      <button
        onClick={() =>
          setLines((prevLines) => [
            ...prevLines,
            <InteractiveLine key={`line-${prevLines.length}`} />,
          ])
        }
        className="bg-gray-200 text-transparent hover:text-black rounded-lg hover:cursor-pointer px-4 min-h-[32px] transition-color duration-150"
      >
        +
      </button>
    );
  };

  return (
    <article
      className={`Paper flex flex-col gap-y-2 bg p-6 rounded-lg ${className}`}
    >
      {lines.map((line) => line)}
      <AddLine />
    </article>
  );
};
