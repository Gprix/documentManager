import { DocumentView } from "@/components/document/DocumentView/DocumentView";

const DocumentViewPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { isTemplate: boolean };
}) => {
  const { id } = params;
  const { isTemplate } = searchParams ?? {};

  return (
    <section className="flex-grow">
      <DocumentView documentId={id} isTemplate={isTemplate} />
    </section>
  );
};

export default DocumentViewPage;
