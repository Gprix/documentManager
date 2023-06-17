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

export const DocumentView = (props: DocumentViewProps) => {
  const { className = "" } = props;
  const { documentId } = props;
  const { selectedDocument, setSelectedDocument } = useDocument();
  const { title } = selectedDocument ?? {};
  const [currentDocument, setCurrentDocument] = useState(selectedDocument);
  const [showDataCaptureModal, setShowDataCaptureModal] = useState(false);

  const handleButtonClick = async () => {
    if (!selectedDocument) return;
    if (!selectedDocument.documentData) return;
    if (!currentDocument) return;

    await updateDocument(currentDocument.uid, currentDocument);
  };

  useLayoutEffect(() => {
    const retrieveDocument = async () => {
      const retrievedDocument = await getDocument(documentId);

      if (!retrievedDocument) return;

      setSelectedDocument(retrievedDocument as Document);
    };
    retrieveDocument();

    return () => {
      setSelectedDocument(undefined);
    };
  }, [documentId, setSelectedDocument]);

  useEffect(() => {
    setCurrentDocument(selectedDocument);
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
            document={currentDocument}
            className="bg-[#f9f9f9] rounded-none text-black mb-32"
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
