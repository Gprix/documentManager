"use client";

import { Archive } from "@/components/document/Archive/Archive";
import { RecentDocuments } from "@/components/document/RecentDocuments/RecentDocuments";
import { DocumentActions } from "@/components/document/DocumentActions/DocumentActions";
import { useState } from "react";
import { TemplatesModal } from "@/components/document/TemplatesModal/TemplatesModal";
import { useTemplates } from "@/contexts/templates/templates.context.hooks";
import { publishDocument } from "@/services/api/elperuano/elperuano.service";
import { createErrorNotification } from "@/utils/notifications.utils";
import { createSuccessNotification } from "@/utils/notifications.utils";

const DocumentsPage = () => {
  const { selectedTemplates } = useTemplates();
  const [modalFlag, setModal] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  // @ts-ignore
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = () => {
    setIsHovered(false);
  };

  // @ts-ignore
  const handleDrop = (event) => {
    event.preventDefault();
    setIsHovered(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // @ts-ignore
  const handleFileUpload = async (file: File | undefined) => {
    // ? Es aquí donde se va a hacer lo del upload de documentos o se va a mover a un componente aparte?
    if (!file) return;

    const pub = await publishDocument({ file });
    if (!pub) {
      createErrorNotification("Error al publicar el documento.");
      return;
    }
    createSuccessNotification("Documento publicado correctamente.");
  };

  const renderUploadDoc = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md w-[50vw] h-[50vh]">
          <div className="flex justify-between items-center px-4 py-2">
            <h2 className="text-xl font-semibold">Subir Documentos</h2>
            <button
              className="text-2xl font-semibold text-gray-500 hover:text-gray-700"
              onClick={() => setModal(false)}
            >
              X
            </button>
          </div>
          <div
            className={`border-2 border-dashed border-gray-400 rounded-lg p-4 m-5 h-[75%] text-center ${
              isHovered ? "border-blue-500" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label htmlFor="fileInput" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center h-full">
                <i className="fas fa-file-upload text-gray-400 text-4xl"></i>
                <span className="mt-2 text-gray-600">
                  Arrastra y suelta archivos aquí o haz clic para seleccionar
                </span>
              </div>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files?.[0])}
              />
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="Documents flex-grow bg-blue-50 text-black overflow-y-auto pt-6 pb-32">
        <h1 className="Documents__title text-2xl font-bold mb-3 ml-6">
          Archivo notarial
        </h1>
        {/* <input type="text" className="Documents__search" /> */}
        <div className="relative">
          <DocumentActions
            templateList={selectedTemplates ?? []}
            className="pt-16"
            withNewAction
            newActionLabel="Nueva acta"
          />
          <div className="absolute top-0 right-0">
            <p className="text-dimmed text-sm text-right pr-4 pt-3">
              Plantillas recientes
            </p>
            <p
              onClick={() => setShowTemplatesModal(!showTemplatesModal)}
              className="text-dimmed text-xs text-right pr-4 underline hover:cursor-pointer"
            >
              Ver plantillas
            </p>
          </div>
        </div>
        <RecentDocuments />
        <Archive />
        <div className="fixed bottom-[5%] right-[5%]">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setModal(true);
            }}
          >
            Subir documento
          </button>
        </div>
        <div className={`flex gap-4 wrap ${!modalFlag ? "hidden" : ""}`}>
          {renderUploadDoc()}
        </div>
      </section>
      {showTemplatesModal ? (
        <TemplatesModal onClose={() => setShowTemplatesModal(false)} />
      ) : null}
    </>
  );
};

export default DocumentsPage;
