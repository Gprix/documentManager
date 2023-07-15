"use client";

import GoBack from "@/components/GoBack/GoBack";
import { DocumentViewProps } from "./DocumentView.types";
import Button from "@/components/shared/Button/Button";
import RightArrowWhiteSVG from "images/icons/right-arrow-white.svg";
import { Paper } from "../Paper/Paper";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getDocument } from "@/services/document/document.service";
import { updateDocument } from "@/services/document/document.service";
import { Document, DocumentType } from "@/types/document.types";
import { useDocument } from "@/contexts/document/document.context.hooks";

import { DataCaptureModal } from "../DataCaptureModal/DataCaptureModal";
// import { DocumentToolbox } from "../DocumentToolbox/DocumentToolbox";
import { getTemplate } from "@/services/template/template.service";
import { updateTemplate } from "@/services/template/template.service";
import { WriteTemplatePayload } from "@/services/template/template.service.types";
import EditableText from "@/components/shared/EditableText/EditableText";
import { EditableTextRef } from "@/components/shared/EditableText/EditableText.types";
import { createErrorNotification } from "@/utils/notifications.utils";
import { exportDocument, importDocument } from "@/utils/document.utils";
import { Modal } from "@/components/shared/Modal/Modal";
import { createSuccessNotification } from "@/utils/notifications.utils";
import Link from "next/link";

export const DocumentView = (props: DocumentViewProps) => {
  const { className = "" } = props;
  const { documentId, isTemplate } = props;
  const { selectedDocument, setSelectedDocument } = useDocument();
  const { title, uid, documentType } = selectedDocument ?? {};
  const [showDataCaptureModal, setShowDataCaptureModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const { setRecentDocuments } = useDocument();
  const [isEditing, setIsEditing] = useState(false);
  const [localType, setLocalType] = useState<DocumentType>();

  const enhancedTitle = useMemo(() => {
    if (!title) return "";

    return title.trim();
  }, [title]);

  const titleRef = useRef<EditableTextRef>(null);

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
      createSuccessNotification("Plantilla actualizada correctamente");
    }

    if (isEditing && !isTemplate) {
      await updateDocument(selectedDocument.uid, {
        ...selectedDocument,
        title: titleRef?.current?.getTitle() ?? title ?? "",
      });
      createSuccessNotification("Acta actualizada correctamente");
    }

    setIsEditing((prev) => !prev);
  };

  const handleImport = async (file: File | undefined) => {
    if (!file) {
      createErrorNotification("No se pudo importar el documento");
      return;
    }
    const isCompressed = file.name.endsWith(".dcn");

    try {
      const imported = await importDocument(file, isCompressed);
      if (!imported) {
        createErrorNotification("No se pudo importar el documento");
        return;
      }
      const documentPayload: Document = {
        ...imported,
        workspaceId: selectedDocument?.workspaceId ?? "",
        uid: selectedDocument?.uid ?? "",
        authorId: selectedDocument?.authorId ?? "",
      };

      setSelectedDocument(documentPayload);
      createSuccessNotification("Documento importado correctamente!");
      await handleButtonClick();
    } catch (e) {
      console.error(e);
    }
  };

  const handlePublishClick = async () => {};

  useEffect(() => {
    if (!documentType) return;

    setLocalType(documentType);
  }, [documentType]);

  useEffect(() => {
    if (!localType) return;
    setSelectedDocument((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        documentType: localType,
      };
    });
  }, [localType]);

  // Set recent documents
  useLayoutEffect(() => {
    if (isTemplate) return;
    if (!uid) return;

    setRecentDocuments((prev) => [...prev, uid].slice(-5));
  }, [isTemplate, setRecentDocuments, uid]);

  // Retrieve document
  useEffect(() => {
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
        <div className="bg-white border-b-gray-100 border-b">
          <div className="DocumentView__controls flex justify-between px-4 pt-6 pb-4 shadow-md">
            <div className="DocumentView__controls--left flex w-full">
              <GoBack />
              <div className="DocumentView__info">
                {enhancedTitle ? (
                  <EditableText
                    ref={titleRef}
                    text={enhancedTitle}
                    className="text-xl mb-2"
                    inputClassName={[
                      "underline underline-offset-[6px]",
                      "force-full-width !max-w-[71vw] z-10 no-focus-outline",
                    ].join(" ")}
                    additionalAction={() => setIsEditing(true)}
                  />
                ) : (
                  <p className="text-xl">{title}</p>
                )}
                {localType ? (
                  <p
                    className={[
                      "text-sm",
                      isEditing ? "hover:cursor-pointer" : "",
                    ].join(" ")}
                    onClick={() =>
                      isEditing
                        ? setLocalType((prev) =>
                            prev === "protocol" ? "extra" : "protocol"
                          )
                        : undefined
                    }
                  >
                    <span className="text-dimmed">
                      {isTemplate ? "Plantilla" : "Acta"}
                    </span>
                    {" 🞄 "}
                    <span
                      className={[
                        localType === "protocol"
                          ? "bg-primary"
                          : "bg-secondary",
                        "px-2 rounded-full text-white",
                      ].join(" ")}
                    >
                      {localType === "protocol"
                        ? "Protocolar"
                        : "Extra protocolar"}
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex items-center  mr-4 ">
              <Link
                href="/workspace/publishdocs"
                className="text-[#FF4D84] underline"
              >
                Ver estado
              </Link>
            </div>
            <div className="flex items-center  mr-4 ">
              <button
                onClick={handlePublishClick}
                className="text-[#FF4D84] underline"
              >
                Publicar
              </button>
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

        {/* {isEditing ? <DocumentToolbox /> : null} */}
        {isEditing ? (
          <div className="flex gap-x-4 bg-primaryLight">
            <Button type="transparent" onClick={() => setShowImportModal(true)}>
              Importar
            </Button>
            <Button
              type="transparent"
              onClick={() => {
                if (!selectedDocument) return;
                exportDocument(selectedDocument);
              }}
            >
              Exportar
            </Button>
          </div>
        ) : null}

        <div
          className={`overflow-y-auto h-screen max-h-screen ${
            isEditing ? "bg-secondaryLight" : ""
          }`}
        >
          <Paper
            isEditing={isEditing}
            document={{ ...selectedDocument } as Document}
            className={[
              "text-black mb-64 transition-md",
              "mx-auto max-w-[1024px] bg-transparent",
              isEditing
                ? "bg-white rounded-xl mt-8 mb-64 shadow-md"
                : "bg-[#f9f9f9] rounded-none",
            ].join(" ")}
          />
        </div>

        <div className="absolute right-0 top-0"></div>

        <div className="absolute right-0 bottom-0 pt-4 pl-4"></div>
      </section>
      {showImportModal ? (
        <Modal
          className="p-6 centered-relative"
          onClose={() => setShowImportModal(false)}
        >
          <p className="text-xl ">Importar documento</p>
          <p className="text-sm text-dimmed mb-3">
            Seleccionar archivo .json o .dcn
          </p>
          <input
            type="file"
            onChange={(e) => handleImport(e.target.files?.[0])}
          />
        </Modal>
      ) : null}
      {showDataCaptureModal ? (
        <DataCaptureModal
          onClose={() => setShowDataCaptureModal(!showDataCaptureModal)}
        />
      ) : null}
    </>
  );
};
