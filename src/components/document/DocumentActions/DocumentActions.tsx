import { writeDocument } from "@/services/document/document.service";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { DocumentActionsProps } from "./DocumentActions.types";
import { getPreviewNodesUtility } from "@/utils/document.utils";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { useRouter } from "next/navigation";
import { Template } from "@/services/template/template.service.types";
import { writeTemplate } from "@/services/template/template.service";

export const DocumentActions = (props: DocumentActionsProps) => {
  const { className = "" } = props;
  const { withNewAction = false, newActionLabel } = props;
  const { templateList, mode = "open", isTemplate = false } = props;
  const { push } = useRouter();
  const { selectedWorkspace } = useWorkspace();

  const newAction = async (template?: Template) => {
    if (!selectedWorkspace) return;
    const { templateData, documentType, uid } = template ?? {};
    const newTitle = `${
      isTemplate ? "Plantilla" : "Acta"
    }-${Date.now().toString()}`;

    const prefix = "/workspace/workshop/";
    const suffix = isTemplate ? "?isTemplate=true" : "";

    if (mode === "new") {
      const newDocument = isTemplate
        ? await writeTemplate({
            name: newTitle,
            workspaceId: selectedWorkspace.uid,
            templateData: templateData ?? [],
            documentType: documentType ?? "protocol",
            enabled: true,
          })
        : await writeDocument({
            title: newTitle,
            workspaceId: selectedWorkspace.uid,
            documentData: templateData ?? [],
            documentType: documentType ?? "protocol",
          });

      if (!newDocument) return;

      push(`${prefix}${newDocument}${suffix}`);
      return;
    }

    push(`${prefix}${uid}${suffix}`);
  };

  return (
    <>
      <div className={`DocumentActions bg-primaryLight pt-2 pb-4 ${className}`}>
        <div className="flex gap-x-8 px-6">
          {withNewAction ? (
            <div onClick={() => newAction()}>
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

            console.log({ uid, name });

            return (
              <DocumentPreview
                documentId={uid}
                key={uid}
                previewNodes={previewNodes}
                documentType={documentType}
                documentName={name}
                action={() => newAction(template)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
