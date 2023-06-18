"use client";

import { Archive } from "@/components/document/Archive/Archive";
import { RecentDocuments } from "@/components/document/RecentDocuments/RecentDocuments";
import { RecentTemplates } from "@/components/document/RecentTemplates/RecentTemplates";
import { useState } from "react";

const DocumentsPage = () => {
  const [modalFlag, setModal] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

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
  const handleFileUpload = async (file) => {
    //TODO - Subir el archivo a Firebase Storage y crear un documento en Firestore con la información del archivo

    // const firestore = firebase.firestore();
    // const documentsCollectionRef = collection(firestore, "documents");

    // const storage = getStorage(firebase);

    // try {
    //   // Subir el archivo al almacenamiento de Firebase
    //   const storageRef = ref(storage, file.name);
    //   await uploadBytes(storageRef, file);

    //   // Obtener la URL de descarga del archivo
    //   const downloadURL = await storageRef.getDownloadURL();

    //   // Crear un documento en Firestore con la información del archivo
    //   const documentData = {
    //     name: file.name,
    //     url: downloadURL,
    //     timestamp: new Date(),
    //   };

    //   // Agregar el documento a la colección 'documents'
    //   await addDoc(documentsCollectionRef, documentData);

    //   console.log("Documento subido exitosamente");
    // } catch (error) {
    //   console.error("Error al subir el documento", error);
    // }

    displayConfirmationMessage();
  };

  const displayConfirmationMessage = () => {
    setIsConfirmationVisible(true);
    setTimeout(() => {
      setIsConfirmationVisible(false);
      setModal(false);
    }, 3000);
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

            {isConfirmationVisible && (
              <p className="bg-green-500 text-white mt-4 text-center py-2 px-4 rounded font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Archivo recibido correctamente
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="Documents flex-grow bg-blue-50 text-black overflow-y-auto pt-6 pb-32">
      <h1 className="Documents__title text-2xl font-bold mb-3 ml-6">
        Archivo notarial
      </h1>
      {/* <input type="text" className="Documents__search" /> */}
      <RecentTemplates />
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
  );
};

export default DocumentsPage;
