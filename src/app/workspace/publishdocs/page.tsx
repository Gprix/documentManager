"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { DocumentPreview } from "@/components/document/DocumentPreview/DocumentPreview";
import { getPreviewNodesUtility } from "@/utils/document.utils";
import Select from "react-select";
import enviarCorreo from "@/services/email/email.service";

const PublishDocs = () => {
  const [docusComponents, setDocusComponents] = useState([]);
  const [infoUser, setInfoUser] = useState([{
    value: "",
    label: "Seleccionar",
  }]);
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
      if (doc.data().clientName && doc.data().clientEmail) {
        console.log(temp);
        // @ts-ignore
        setInfoUser((prev) => [...prev, temp]);
      }
    });
  };

  //@ts-ignore
  const handlerNotificar = (obj) => {
    enviarCorreo(obj);
  };

  //@ts-ignore
  const RenderDoc = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    let tempDoc = props.documento.document;
    var color = "bg-gray-400";
    var estado_label = "No Solicitado";
    if (tempDoc.estado === "pending") {
      color = "bg-yellow-300";
      estado_label = "Pendiente";
    } else if (tempDoc.estado === "approved") {
      color = "bg-green-300";
      estado_label = "Aprovado";
    } else if (tempDoc.estado === "published") {
      color = "bg-blue-300";
      estado_label = "Publicado";
    } else if (tempDoc.estado === "rejected") {
      color = "bg-red-300";
      estado_label = "Rechazado";
    }

    const style = "h-3 w-3 rounded-full " + color;

    const previewNodes = getPreviewNodesUtility(tempDoc.docData);

    const myTemp = {
      // @ts-ignore
      target: `${selectedOption ? selectedOption.value : ""}`,
      // @ts-ignore
      name: `${selectedOption ? selectedOption.label.split(" - ")[0] : ""}`,
      from_name: "Docunot",
      message: `Tenemos su documento "${tempDoc.title}" en estado "${estado_label}"`,
    };

    // @ts-ignore
    const handleSelectChange = (selected) => {
      setSelectedOption(selected);
    };

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

          <Select
            className="w-fit-content max-w-[15vw]"
            options={infoUser}
            isSearchable
            value={selectedOption}
            onChange={handleSelectChange}
          />

          <div className="flex flex-row justify-center items-center gap-2">
            <div className={style}></div>
            <div>{estado_label}</div>
          </div>
          <button
            className="bg-transparent border border-gray-400 text-gray-400 py-2 px-4 rounded hover:bg-gray-400 hover:text-white transition-colors duration-300"
            onClick={() => handlerNotificar(myTemp)}
          >
            Notificar
          </button>
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
