"use client";

import { DocumentPreview } from "@/components/document/DocumentPreview/DocumentPreview";
import { RecentTemplates } from "@/components/document/RecentTemplates/RecentTemplates";

const RecentDocuments = () => {
  return (
    <section>
      <h2 className="Documents__subtitle">Documentos recientes</h2>
      <ul className="flex gap-x-8 px-6">
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
      </ul>
    </section>
  );
};

const Archive = () => {
  return (
    <section>
      <h2 className="Documents__subtitle">Directorio principal</h2>
      <ul className="w-full flex-wrap flex gap-8 px-6">
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
        <DocumentPreview
          previewNodes={[]}
          documentType="protocol"
          documentName="Acta rectificación 1234"
        />
      </ul>
    </section>
  );
};

const DocumentsPage = () => {
  return (
    <section className="Documents flex-grow bg-blue-50 text-black overflow-y-auto pt-6 pb-32">
      <h1 className="Documents__title text-2xl font-bold mb-3 ml-6">
        Archivo notarial
      </h1>
      {/* <input type="text" className="Documents__search" /> */}
      <RecentTemplates />
      <RecentDocuments />
      <Archive />
    </section>
  );
};

export default DocumentsPage;
