import { useDocument } from "@/contexts/document/document.context.hooks";
import { DocumentPreview } from "../DocumentPreview/DocumentPreview";
import { RecentDocumentsProps } from "./RecentDocuments.types";
import { getPreviewNodesUtility } from "@/utils/document.utils";

export const RecentDocuments = (props: RecentDocumentsProps) => {
  const { className = "" } = props;
  const { archiveDocuments, recentDocuments } = useDocument();

  const recent = archiveDocuments?.filter((document) =>
    recentDocuments?.includes(document.uid)
  );

  return (
    <section className={`RecentDocuments ${className}`}>
      {recent && recent.length ? (
        <h2 className="Documents__subtitle">Documentos recientes</h2>
      ) : null}
      <ul className="flex gap-x-8 px-6">
        {recent?.map((document) => {
          const { uid, documentType, title, documentData } = document;

          const previewNodes = getPreviewNodesUtility(documentData);

          return (
            <DocumentPreview
              key={uid}
              documentId={uid}
              documentType={documentType}
              documentName={title}
              previewNodes={previewNodes}
            />
          );
        })}
      </ul>
    </section>
  );
};
