import { DocumentPreviewProps } from "./DocumentPreview.types";

export const DocumentPreview = (props: DocumentPreviewProps) => {
  const { className = "" } = props;

  return <div className={`DocumentPreview ${className}`}></div>;
};
