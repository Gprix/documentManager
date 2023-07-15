"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";

const PublishDocs = () => {
  const [docusComponents, setDocusComponents] = useState([]);
  // @ts-ignore
  const { selectedWorkspace } = useWorkspace();

  useEffect(() => {
    // if (!selectedWorkspace) return;
    // const { uid: workspaceId } = selectedWorkspace;

    getDocusComponents("workspaceId");
  }, []);

  const getDocusComponents = async (wuid) => {
    const querySnapshot = await getDocs(collection(db, "documents"));

    querySnapshot.forEach((doc) => {
      let temp = {
        uid: doc.data().uid,
        title: doc.data().title,
        type: doc.data().documentType,
        workspaceId: doc.data().workspaceId,
        estado: doc.data().estado || "",
      };

      //@ts-ignore
      setDocusComponents((prev) => [...prev, temp]);
    });

    //@ts-ignore
    console.log(docusComponents.filter((fil) => fil.workspaceId !== wuid));
  };

  const RenderDoc = (props) => {
    let tempDoc = props.documento.document;
    var color = "bg-gray-400";
    if (tempDoc.estado === "Publicado") {
        color = "bg-green-500";
    }else if (tempDoc.estado === "En revisión") {
        color = "bg-yellow-500";
    }else if (tempDoc.estado === "No publicado") {
        color = "bg-red-500";
    }
    const style = "h-2 w-2 rounded-full " + color;
    return (
      <div>
        <h3>{tempDoc.title}</h3>
        <p>{tempDoc.type}</p>
        <p>{tempDoc.estado}</p>
        <div className={style}></div>
        <div>
            <button>Publicar</button>
        </div>
      </div>
    );
  };

  return (
    <section className="Documents flex-grow bg-blue-50 text-black overflow-y-auto pt-6 pb-32">
      <h1 className="Documents__title text-2xl font-bold mb-3 ml-6">
        Tus Documentos
      </h1>
      <ul>
        {docusComponents.map((document) => (
          //@ts-ignore
          <RenderDoc key={document.uid} documento={{ document }} />
        ))}
      </ul>
    </section>
  );
};

export default PublishDocs;
