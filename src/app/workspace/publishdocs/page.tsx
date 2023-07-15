"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { DocumentPreview } from "@/components/document/DocumentPreview/DocumentPreview";
import { getPreviewNodesUtility } from "@/utils/document.utils";
import Select from "react-select";
import { set } from "date-fns";

const PublishDocs = () => {
  const [docusComponents, setDocusComponents] = useState([]);
  const [infoUser, setInfoUser] = useState([]);
  // @ts-ignore
  const { selectedWorkspace } = useWorkspace();

  useEffect(() => {
    // if (!selectedWorkspace) return;
    // const { uid: workspaceId } = selectedWorkspace;
    getInfoUser();
    getDocusComponents("1a56661e-c1f3-4b57-9db5-dfd4ee08db19" || "workspaceId");
  }, []);

  //@ts-ignore
  const getDocusComponents = async (wuid) => {
    const querySnapshot = await getDocs(collection(db, "documents"));

    querySnapshot.forEach((doc) => {
      let temp = {
        uid: doc.data().uid,
        title: doc.data().title,
        type: doc.data().documentType,
        workspaceId: doc.data().workspaceId,
        docData: doc.data().documentData,
        estado: doc.data().estado || "No publicado",
      };
      //@ts-ignore
      setDocusComponents((prev) => [...prev, temp]);
    });
  };

  const getInfoUser = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));

    querySnapshot.forEach((doc) => {
      let temp = {
        value: doc.data().clientEmail || "",
        label: `${doc.data().clientName} - ${doc.data().clientEmail || ""}`,
      };
      
      //@ts-ignore
      if((doc.data().clientName || doc.data().clientEmail)){
        console.log(temp)
        setInfoUser((prev) => [...prev, temp]);
      }
    });
  };

  const RenderDoc = (props) => {
    let tempDoc = props.documento.document;
    var color = "bg-gray-400";
    if (tempDoc.estado === "Publicado") {
      color = "bg-green-500";
    } else if (tempDoc.estado === "En revisión") {
      color = "bg-yellow-500";
    } else if (tempDoc.estado === "No publicado") {
      color = "bg-red-500";
    }
    const style = "h-3 w-3 rounded-full " + color;

    const previewNodes = getPreviewNodesUtility(tempDoc.docData);

    const userList = [
      { value: "Usuario 1", label: "usuario1@example.com" },
      { value: "Usuario 2", label: "usuario2@example.com" },
      { value: "Usuario 3", label: "usuario3@example.com" },
      // Agrega más usuarios aquí
    ];

    return (
      <div className="flex-col w-[80vw]">
        <h3>{tempDoc.title}</h3>
        <div className="flex justify-around items-center">
          <DocumentPreview
            key={tempDoc.uid}
            documentId={tempDoc.uid}
            previewNodes={previewNodes}
            documentType={tempDoc.type}
            documentName=""
          />

          <Select className="w-fit-content" options={infoUser} isSearchable />

          <div className="flex flex-row justify-center items-center gap-2">
            <div className={style}></div>
            <div>{tempDoc.estado}</div>
          </div>
          <button>Notificar</button>
        </div>
      </div>
    );
  };

  return (
    <section className="flex-grow bg-blue-50 text-black overflow-y-auto pt-6 pb-32">
      <h1 className="text-2xl font-bold mb-3 ml-6">Tus Documentos</h1>
      <ul className="flex gap-4 flex-wrap mx-6">
        {docusComponents.map((document) => (
          //@ts-ignore
          <RenderDoc key={document.uid} documento={{ document }} />
        ))}
      </ul>
    </section>
  );
};

export default PublishDocs;
