"use client";

import GoBack from "@/components/GoBack/GoBack";
import { DocumentViewProps } from "./DocumentView.types";
import Button from "@/components/shared/Button/Button";
import RightArrowWhiteSVG from "../../../../public/images/icons/right-arrow-white.svg";
import { Paper } from "../Paper/Paper";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getDocument } from "@/services/document/document.service";
import { updateDocument } from "@/services/document/document.service";
import { Document, DocumentType } from "@/types/document.types";
import { useDocument } from "@/contexts/document/document.context.hooks";

// import DropdownArrowWhiteSVG from "../../../../public/images/icons/dropdown-arrow-white.svg";
import { DataCaptureModal } from "../DataCaptureModal/DataCaptureModal";
// import { DocumentToolbox } from "../DocumentToolbox/DocumentToolbox";
import { getTemplate } from "@/services/template/template.service";
import { updateTemplate } from "@/services/template/template.service";
import { WriteTemplatePayload } from "@/services/template/template.service.types";
import EditableText from "@/components/shared/EditableText/EditableText";
import { EditableTextRef } from "@/components/shared/EditableText/EditableText.types";
// import { doc, setDoc } from "@firebase/firestore";
// import { db } from "@/config/firebase.config";

export const DocumentView = (props: DocumentViewProps) => {
  const { className = "" } = props;
  const { documentId, isTemplate } = props;
  const { selectedDocument, setSelectedDocument } = useDocument();
  const { title, uid, documentType: _documentType } = selectedDocument ?? {};
  const [showDataCaptureModal, setShowDataCaptureModal] = useState(false);
  const { setRecentDocuments } = useDocument();
  const [isEditing, setIsEditing] = useState(false);
  const [localType, setLocalType] = useState<DocumentType>();

  const documentType = useMemo(() => {
    if (!_documentType) return;

    setLocalType(_documentType);
    return _documentType;
  }, [selectedDocument]);

  console.log({ documentType });
  console.log({ localType });

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
    }

    if (isEditing && !isTemplate)
      await updateDocument(selectedDocument.uid, selectedDocument);

    setIsEditing((prev) => !prev);
  };

  const handleSwitchProtocol = () => {
    setLocalType((prev) => (prev === "protocol" ? "extra" : "protocol"));
    setSelectedDocument((prev) => {
      if (!prev) return prev;
      console.log({ dt: prev.documentType });

      return {
        ...prev,
        documentType: localType ? "protocol" : "extra",
      };
    });
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
                      isEditing ? handleSwitchProtocol() : undefined
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
        {/* {isEditing ? <DocumentToolbox /> : null} */}
        {isEditing ? (
          <div className="flex gap-x-4 px-2">
            <button>Importar</button>
            <button>Exportar</button>
          </div>
        ) : null}

        {/* Document */}
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

        {/* <div className="absolute right-0 top-0">
          <DataCaptureWidget />
        </div> */}

        <div className="absolute right-0 bottom-0 pt-4 pl-4">
          {/* <Button
            className="mr-4 mb-32"
            rightIcon={DropdownArrowWhiteSVG}
            // onClick={() => setShowDataCaptureModal(!showDataCaptureModal)}
            onClick={() => {
              const testWriteDataBlock = async () => {
                const values = [
                  "Son",
                  "Es",
                  "Mayor de edad",
                  "Hábil para contratar",
                  "Inteligente en el idioma castellano",
                  "Procede con libertad, capacidad y conocimiento suficiente",
                  "De lo que doy fe",
                  "Y",
                ];

                try {
                  values.forEach(async (value) => {
                    const uid = crypto.randomUUID();

                    await setDoc(doc(db, "datablocks", uid), {
                      authorId: "AtnCKk4MQEYIbQOftB7d8lVFI3o2",
                      workspaceId: "1a56661e-c1f3-4b57-9db5-dfd4ee08db19",
                      uid: uid,
                      value: value,
                    });
                    console.log("Data block added:", value);
                  });
                } catch (e) {
                  console.log("Error adding datablock: ", e);
                }
              };

              testWriteDataBlock();
            }}
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
