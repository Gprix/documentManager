"use client";

import { InteractiveLine } from "@/components/document/InteractiveLine/InteractiveLine";

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
    <section className="Documents flex-grow bg-blue-100 text-black">
      <h1 className="Documents__title">Documentos</h1>
      <input type="text" className="Documents__search" />
      {/* FAKE PAPER */}
      <div className="flex flex-col gap-y-2 bg-white p-6 rounded-lg">
        <InteractiveLine />
        <InteractiveLine />
        <InteractiveLine />
        <InteractiveLine />
      </div>
      <RecentDocuments />
      <Archive />
    </section>
  );
};

export default DocumentsPage;
