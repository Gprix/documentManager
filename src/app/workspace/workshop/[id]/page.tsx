import { DocumentView } from "@/components/document/DocumentView/DocumentView";

const DocumentViewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <section className="flex-grow">
      <DocumentView documentId={id} />
    </section>
  );
};

export default DocumentViewPage;
