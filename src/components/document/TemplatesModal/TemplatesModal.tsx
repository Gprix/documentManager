"use client";

import { Modal } from "@/components/shared/Modal/Modal";
import { TemplatesModalProps } from "./TemplatesModal.types";
import { DocumentActions } from "../DocumentActions/DocumentActions";
import Button from "@/components/shared/Button/Button";
import { useState } from "react";
import { useTemplates } from "@/contexts/templates/templates.context.hooks";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { writeTemplate } from "@/services/template/template.service";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar/SearchBar";

export const TemplatesModal = (props: TemplatesModalProps) => {
  const { className = "", onClose } = props;
  const { push } = useRouter();
  const { selectedTemplates } = useTemplates();
  const { selectedWorkspace } = useWorkspace();
  const [filters, setFilters] = useState({
    protocol: true,
    extra: true,
    untagged: true,
  });
  const buttonInactiveStyle = "bg-transparent hover:bg-primaryLight";
  const buttonInactiveTextStyle = "!text-primary";

  const newTemplateHandler = async () => {
    if (!selectedWorkspace) return;

    const newTemplate = await writeTemplate({
      name: `Template-${Date.now().toString()}`,
      templateData: [],
      documentType: "protocol",
      enabled: true,
      workspaceId: selectedWorkspace.uid,
    });

    if (!newTemplate) return;
    push(`/workspace/workshop/${newTemplate}?isTemplate=true`);
  };

  return (
    <Modal
      onClose={onClose}
      className={`TemplatesModal centered-relative ${className}`}
    >
      <h2 className="ml-6 font-medium text-xl mt-8 mb-6">Plantillas</h2>
      <DocumentActions
        templateList={selectedTemplates ?? []}
        withNewAction
        newActionLabel="Nueva plantilla"
        newAction={() => newTemplateHandler()}
      />

      <SearchBar />

      <div className="Filters mx-6 flex gap-x-2 my-4">
        <Button
          className={`py-2 border-2 border-primary ${
            filters.protocol ? "" : buttonInactiveStyle
          }`}
          textStyle={`text-sm ${
            filters.protocol ? "" : buttonInactiveTextStyle
          }`}
          onClick={() =>
            setFilters((prev) => ({ ...prev, protocol: !prev.protocol }))
          }
        >
          Protocolares
        </Button>
        <Button
          className={`py-2 border-2 border-primary ${
            filters.extra ? "" : buttonInactiveStyle
          }`}
          textStyle={`text-sm ${filters.extra ? "" : buttonInactiveTextStyle}`}
          onClick={() =>
            setFilters((prev) => ({ ...prev, extra: !prev.extra }))
          }
        >
          Extra protocolares
        </Button>
        <Button
          className={`py-2 border-2 border-primary ${
            filters.untagged ? "" : buttonInactiveStyle
          }`}
          textStyle={`text-sm ${
            filters.untagged ? "" : buttonInactiveTextStyle
          }`}
          onClick={() => {
            setFilters((prev) => ({ ...prev, untagged: !prev.untagged }));
          }}
        >
          Sin etiquetar
        </Button>
      </div>

      {selectedTemplates?.map((template) => {
        const { uid, documentType, name } = template;

        return (
          <DocumentPreview
            documentId={uid}
            key={uid}
            previewNodes={[]}
            documentType={documentType}
            documentName={name}
          />
        );
      })}
    </Modal>
  );
};
