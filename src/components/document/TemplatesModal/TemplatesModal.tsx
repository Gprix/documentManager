"use client";

import { Modal } from "@/components/shared/Modal/Modal";
import { TemplatesModalProps } from "./TemplatesModal.types";
import { DocumentActions } from "../DocumentActions/DocumentActions";
import Button from "@/components/shared/Button/Button";
import { useState } from "react";
import { useTemplates } from "@/contexts/templates/templates.context.hooks";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { getPreviewNodesUtility } from "@/utils/document.utils";

export const TemplatesModal = (props: TemplatesModalProps) => {
  const { className = "", onClose } = props;
  const { selectedTemplates } = useTemplates();
  const [filters, setFilters] = useState({
    protocol: true,
    extra: true,
    untagged: true,
  });
  const buttonInactiveStyle = "bg-transparent hover:bg-primaryLight";
  const buttonInactiveTextStyle = "!text-primary";

  return (
    <Modal
      onClose={onClose}
      className={`TemplatesModal centered-relative pb-6 w-[90%] ${className}`}
    >
      <h2 className="ml-6 font-medium text-xl mt-8 mb-6">Plantillas</h2>
      <DocumentActions
        templateList={selectedTemplates ?? []}
        withNewAction
        newActionLabel="Nueva plantilla"
        isTemplate
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

      <ul className="w-full flex-wrap flex gap-8 px-6">
        {selectedTemplates?.map((template) => {
          const { uid, documentType, name, templateData } = template;

          const previewNodes = getPreviewNodesUtility(templateData);

          return (
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
      </ul>
    </Modal>
  );
};
