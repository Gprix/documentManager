"use client";

import { DocumentPreviewProps } from "./DocumentPreview.types";
import { nodesDataToTextHelper } from "./DocumentPreview.helpers";
import { useDatablocks } from "@/contexts/datablocks/datablocks.context.hooks";
import { useRouter } from "next/navigation";

export const DocumentPreview = (props: DocumentPreviewProps) => {
  const { className = "" } = props;
  const { documentType, documentName, documentId } = props;
  const { previewNodes, action, isTemplate } = props;
  const isProtocol = documentType === "protocol";
  const { push } = useRouter();
  const { selectedDatablocks } = useDatablocks();
  const to = `/workspace/workshop/${documentId}${
    isTemplate ? "?isTemplate=true" : ""
  }`;

  const defaultAction = action ?? (() => push(to));

  return (
    <div>
      <div
        onClick={() => defaultAction()}
        className={`DocumentPreview bg-white border border-transparent group relative w-[15rem] h-[10rem] hover:cursor-pointer hover:border ${
          isProtocol ? "hover:border-primary" : "hover:border-secondary"
        } transition-all rounded-t-xl duration-150 ${className}`}
      >
        <p className="max-h-[10rem] py-2 pl-2 text-dimmed text-sm pr-6 pb-10 overflow-y-scroll">
          {nodesDataToTextHelper(previewNodes, selectedDatablocks ?? [])}
        </p>
        <p
          className={`group-hover:w-full group-hover:rounded-none w-8 rounded-l-xl overflow-clip absolute bottom-0 right-0 px-3 pt-2 pb-1 ${
            isProtocol ? "bg-primary" : "bg-secondary"
          } text-white font-semibold text-sm transition-all duration-150`}
        >
          {isProtocol ? "Protocolar" : "Extra"}
        </p>
      </div>
      <p className="max-w-[240px] text-ellipsis line-clamp-2 text-sm mt-1 font-mono">
        {documentName}
      </p>
    </div>
  );
};
