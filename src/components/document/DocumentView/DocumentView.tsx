"use client";

import GoBack from "@/components/GoBack/GoBack";
import { DocumentViewProps } from "./DocumentView.types";
import Button from "@/components/shared/Button/Button";
import RightArrowWhiteSVG from "../../../../public/images/icons/right-arrow-white.svg";
import { Paper } from "../Paper/Paper";
import { useEffect, useLayoutEffect, useState } from "react";
import { getDocument } from "@/services/document/document.service";
import { updateDocument } from "@/services/document/document.service";
import { Document } from "@/types/document.types";
import { useDocument } from "@/contexts/document/document.context.hooks";

// import DropdownArrowWhiteSVG from "../../../../public/images/icons/dropdown-arrow-white.svg";
import { DataCaptureModal } from "../DataCaptureModal/DataCaptureModal";
import { DocumentToolbox } from "../DocumentToolbox/DocumentToolbox";
import { getTemplate } from "@/services/template/template.service";
import { updateTemplate } from "@/services/template/template.service";
import { WriteTemplatePayload } from "@/services/template/template.service.types";

export const DocumentView = (props: DocumentViewProps) => {
  const { className = "" } = props;
  const { documentId, isTemplate } = props;
  const { selectedDocument, setSelectedDocument } = useDocument();
  const { title, uid } = selectedDocument ?? {};
  const [showDataCaptureModal, setShowDataCaptureModal] = useState(false);
  const { setRecentDocuments } = useDocument();
  const [isEditing, setIsEditing] = useState(false);

  const handleButtonClick = async () => {
    if (!selectedDocument) return;

    if (isEditing && isTemplate) {
      const currentTemplateId: string = selectedDocument.uid;

      const currentTemplate: WriteTemplatePayload = {
        workspaceId: selectedDocument.workspaceId,
        documentType: selectedDocument.documentType,
        templateData: selectedDocument.documentData,
        name: selectedDocument.title,
        // TODO: manage enabled state better
        enabled: true,
      };

      await updateTemplate(currentTemplateId, currentTemplate);
    }

    if (isEditing && !isTemplate)
      await updateDocument(selectedDocument.uid, selectedDocument);

    setIsEditing((prev) => !prev);
  };

  // Set recent documents
  useLayoutEffect(() => {
    if (isTemplate) return;
    if (!uid) return;

    setRecentDocuments((prev) => [...prev, uid].slice(-5));
  }, [isTemplate, setRecentDocuments, uid]);

  // Retrieve document
  useLayoutEffect(() => {
    const retrieveDocument = async () => {
      const retrievedDocument = isTemplate
        ? await getTemplate(documentId)
        : await getDocument(documentId);

      if (!retrievedDocument) return;

      if (isTemplate) {
        const rawDoc: Document = {
          uid: retrievedDocument.uid,
          authorId: retrievedDocument.authorId,
          workspaceId: retrievedDocument.workspaceId,
          documentType: retrievedDocument.documentType,
          title: retrievedDocument.name,
          documentData: retrievedDocument.templateData,
        };
        setSelectedDocument(rawDoc as Document);
        return;
      }

      setSelectedDocument(retrievedDocument as Document);
    };
    retrieveDocument();

    return () => {
      setSelectedDocument(undefined);
    };
  }, [documentId, isTemplate, setSelectedDocument]);

  useEffect(() => {
    if (!selectedDocument) return;
  }, [selectedDocument]);

  return (
    <>
      <section className={`DocumentView relative ${className}`}>
        {/* Top toolbar */}
        <div className="bg-white">
          <div className="DocumentView__controls flex justify-between px-4 pt-6 pb-4 shadow-md">
            <div className="DocumentView__controls--left flex w-full">
              <GoBack />
              <div className="DocumentView__info">
                <p className="text-black text-xl">{title}</p>
                {/* <p className="text-dimmed">Última modificación por: </p> */}
              </div>
            </div>
            <Button
              onClick={handleButtonClick}
              className="DocumentView__button"
              rightIcon={RightArrowWhiteSVG}
            >
              {isEditing ? "Guardar" : "Editar"}
            </Button>
          </div>
        </div>

        {/* Document toolbar */}
        {isEditing ? <DocumentToolbox /> : null}

        {/* Document */}
        <div
          className={`overflow-y-auto h-screen max-h-screen ${
            isEditing ? "bg-secondaryLight" : ""
          }`}
        >
          <Paper
            document={{ ...selectedDocument } as Document}
            className={`text-black mb-32 transition-all duration-150 ${
              isEditing
                ? "bg-white rounded-xl mx-32 mt-8"
                : "bg-[#f9f9f9] rounded-none"
            }`}
          />
        </div>

        {/* <div className="absolute right-0 top-0">
          <DataCaptureWidget />
        </div> */}

        <div className="absolute right-0 bottom-0 pt-4 pl-4">
          {/* <Button
            className="mr-4 mb-32"
            rightIcon={DropdownArrowWhiteSVG}
            onClick={() => setShowDataCaptureModal(!showDataCaptureModal)}
          >
            Capturar datos
          </Button> */}
        </div>
      </section>
      {showDataCaptureModal ? (
        <DataCaptureModal
          onClose={() => setShowDataCaptureModal(!showDataCaptureModal)}
        />
      ) : null}
    </>
  );
};
