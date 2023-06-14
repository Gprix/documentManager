"use client";

import GoBack from "@/components/GoBack/GoBack";
import { DocumentViewProps } from "./DocumentView.types";
import Button from "@/components/shared/Button/Button";
import RightArrowWhiteSVG from "../../../../public/images/icons/right-arrow-white.svg";
import { Paper } from "../Paper/Paper";
import { useLayoutEffect } from "react";
import {
  getDocument,
  updateDocument,
} from "@/services/document/document.service";
import { Document } from "@/types/document.types";
import { useDocument } from "@/contexts/document/document.context.hooks";

export const DocumentView = (props: DocumentViewProps) => {
  const { className = "" } = props;
  const { documentId } = props;
  const { selectedDocument, setSelectedDocument } = useDocument();
  const { title } = selectedDocument ?? {};

  const handleButtonClick = async () => {
    if (!selectedDocument) return;
    if (!selectedDocument.documentData) return;

    await updateDocument(selectedDocument.uid, selectedDocument);
  };

  useLayoutEffect(() => {
    const retrieveDocument = async () => {
      const retrievedDocument = await getDocument(documentId);

      if (!retrievedDocument) return;

      const { documentData } = retrievedDocument;

      setSelectedDocument({
        ...retrievedDocument,
        documentData: JSON.parse(documentData) ?? null,
      } as Document);
    };
    retrieveDocument();

    return () => {
      setSelectedDocument(undefined);
    };
  }, [documentId, setSelectedDocument]);

  return (
    <section className={`DocumentView ${className}`}>
      {/* Top toolbar */}
      <div className="bg-white">
        <div className="DocumentView__controls flex justify-between px-4 pt-6 pb-4 shadow-md">
          <div className="DocumentView__controls--left flex w-full">
            <GoBack />
            <div className="DocumentView__info">
              <p className="text-black text-xl">{title}</p>
              <p className="text-dimmed">Última modificación por: </p>
            </div>
          </div>
          <Button
            onClick={handleButtonClick}
            className="DocumentView__button"
            rightIcon={RightArrowWhiteSVG}
          >
            Editar
          </Button>
        </div>
      </div>

      {/* Document */}
      <div className="overflow-y-auto h-screen max-h-screen">
        <Paper
          document={selectedDocument}
          className="bg-[#f9f9f9] rounded-none text-black mb-32"
        />
      </div>
    </section>
  );
};
