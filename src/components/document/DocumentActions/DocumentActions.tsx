import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { DocumentActionsProps } from "./DocumentActions.types";
import { getPreviewNodesUtility } from "@/utils/document.utils";

export const DocumentActions = (props: DocumentActionsProps) => {
  const { className = "" } = props;
  const { withNewAction, newActionLabel, newAction } = props;
  const { templateList } = props;

  return (
    <>
      <div className={`DocumentActions bg-primaryLight pt-2 pb-4 ${className}`}>
        <div className="flex gap-x-8 px-6">
          {withNewAction ? (
            <div onClick={() => newAction?.()}>
              <div className="border border-transparent hover:border-dimmed bg-white relative w-[15rem] h-[10rem] hover:cursor-pointer rounded-t-xl transition-all duration-150">
                <p className="centered-relative text-4xl font-bold">+</p>
              </div>
              <p className="hover:cursor-text text-sm mt-1 font-mono">
                {newActionLabel}
              </p>
            </div>
          ) : null}
          {templateList?.map((template) => {
            const { uid, documentType, name, templateData } = template;
            const previewNodes = getPreviewNodesUtility(templateData);

            return (
              // TODO: New document based on template
              <DocumentPreview
                documentId={uid}
                key={uid}
                previewNodes={previewNodes}
                documentType={documentType}
                documentName={name}
                isTemplate
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
