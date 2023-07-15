import { writeDocument } from "@/services/document/document.service";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { DocumentActionsProps } from "./DocumentActions.types";
import { getPreviewNodesUtility } from "@/utils/document.utils";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { useRouter } from "next/navigation";
import { Template } from "@/services/template/template.service.types";
import { writeTemplate } from "@/services/template/template.service";
import { createErrorNotification } from "@/utils/notifications.utils";

export const DocumentActions = (props: DocumentActionsProps) => {
  const { className = "" } = props;
  const { withNewAction = false, newActionLabel } = props;
  const { templateList, isTemplate = false } = props;
  const { push } = useRouter();
  const { selectedWorkspace } = useWorkspace();
  const newTitle = `Nueva ${
    isTemplate ? "plantilla" : "acta"
  }-${Date.now().toString()}`;

  const newAction = async () => {
    if (!selectedWorkspace) return;

    if (isTemplate) {
      const template = await writeTemplate({
        name: newTitle,
        workspaceId: selectedWorkspace.uid,
        templateData: [],
        documentType: "protocol",
        enabled: true,
      });

      if (!template) {
        createErrorNotification("No se pudo crear la plantilla");
        return;
      }
      push(`/workspace/workshop/${template}?isTemplate=true`);
    } else {
      const document = await writeDocument({
        title: newTitle,
        workspaceId: selectedWorkspace.uid,
        documentData: [],
        documentType: "protocol",
      });

      if (!document) {
        createErrorNotification("No se pudo crear el acta");
        return;
      }
      push(`/workspace/workshop/${document}`);
    }
  };

  const templateAction = async (template: Template) => {
    if (!selectedWorkspace) return;

    const { name, templateData, documentType: templateType } = template;

    const title = `${isTemplate ? "Plantilla" : "Acta"} basada en ${name}`;

    if (isTemplate) {
      const template = await writeTemplate({
        name: title,
        workspaceId: selectedWorkspace.uid,
        templateData: templateData,
        documentType: templateType ?? "protocol",
        enabled: true,
      });

      if (!template) return;
      push(`/workspace/workshop/${template}?isTemplate=true`);
    } else {
      const document = await writeDocument({
        title,
        workspaceId: selectedWorkspace.uid,
        documentData: templateData,
        documentType: templateType ?? "protocol",
      });

      if (!document) return;
      push(`/workspace/workshop/${document}`);
    }
  };

  return (
    <>
      <div className={`DocumentActions bg-primaryLight pt-2 pb-4 ${className}`}>
        <div
          className={[
            "flex gap-x-8 px-6 overflow-x-auto",
            isTemplate ? "pt-2" : "pt-14",
          ].join(" ")}
        >
          {withNewAction ? (
            <div onClick={() => newAction()}>
              <div
                className={[
                  "border border-transparent hover:border-dimmed bg-white",
                  "relative w-[15rem] h-[10rem] hover:cursor-pointer rounded-t-xl transition-md",
                ].join(" ")}
              >
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
              <DocumentPreview
                documentId={uid}
                key={uid}
                previewNodes={previewNodes}
                documentType={documentType}
                documentName={name}
                action={() => templateAction(template)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
