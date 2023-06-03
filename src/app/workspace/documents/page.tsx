"use client";

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
    <section className="Documents">
      <h1 className="Documents__title">Documentos</h1>
      <input type="text" className="Documents__search" />
      <RecentDocuments />
      <Archive />
    </section>
  );
};

export default DocumentsPage;
