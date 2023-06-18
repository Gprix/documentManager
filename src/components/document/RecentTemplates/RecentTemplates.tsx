"use client";

import { useTemplates } from "@/contexts/templates/templates.context.hooks";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { RecentTemplatesProps } from "./RecentTemplates.types";

export const RecentTemplates = (props: RecentTemplatesProps) => {
  const { className = "" } = props;
  const { selectedTemplates } = useTemplates();

  return (
    <div className={`RecentTemplates bg-primaryLight pt-2 pb-4 ${className}`}>
      <p className="text-dimmed text-sm text-right pr-4 pt-2">
        Plantillas recientes
      </p>
      <div className="flex gap-x-8 px-6">
        <div>
          <div className="border border-transparent hover:border-dimmed bg-white relative w-[15rem] h-[10rem] hover:cursor-pointer rounded-t-xl transition-all duration-150">
            <p className="centered-relative text-4xl font-bold">+</p>
          </div>
          <p className="hover:cursor-text text-sm mt-1 font-mono">Nueva acta</p>
        </div>
        {selectedTemplates?.map((template) => {
          const { uid, documentType, name } = template;

          return (
            <DocumentPreview
              key={uid}
              previewNodes={[]}
              documentType={documentType}
              documentName={name}
            />
          );
        })}
      </div>
    </div>
  );
};
