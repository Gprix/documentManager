"use client";

import { DocumentPreview } from "@/components/archive/DocumentPreview/DocumentPreview";

const RecentDocuments = () => {
  return (
    <section>
      <h2 className="Documents__subtitle">Documentos recientes</h2>
      <ul></ul>
    </section>
  );
};

const Archive = () => {
  return (
    <section>
      <h2 className="Documents__subtitle">Archivo notarial</h2>
      <ul></ul>
    </section>
  );
};

const DocumentsPage = () => {
  return (
    <section className="Documents flex-grow bg-blue-100 text-black relative">
      <h1 className="Documents__title">Archivo notarial</h1>

      <section className="NewDocumentBanner">
        <div className="NewDocumentCard"></div>
        <ul className="DocumentPreviewList">
          <DocumentPreview />
        </ul>
      </section>

      <section className="RecentDocumentBanner">
        <ul className="DocumentPreviewList">
          <DocumentPreview />
        </ul>
      </section>

      <section className="ArchiveDirectory">
        <DocumentPreview />
        <div className="FolderPreview"></div>
      </section>

      <button className="SearchDocumentFAB bg-primary">O</button>
      {/* <RecentDocuments /> */}
      {/* <Archive /> */}
    </section>
  );
};

export default DocumentsPage;
