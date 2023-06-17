import { DocumentPreviewProps } from "./DocumentPreview.types";

export const DocumentPreview = (props: DocumentPreviewProps) => {
  const { className = "" } = props;
  const { documentType, documentName } = props;
  const isProtocol = documentType === "protocol";

  return (
    <div>
      <div
        className={`DocumentPreview bg-white border border-transparent group relative w-[15rem] h-[10rem] hover:cursor-pointer hover:border ${
          isProtocol ? "hover:border-primary" : "hover:border-secondary"
        } transition-all rounded-t-xl duration-150 ${className}`}
      >
        <div>{/* preview aqui */}</div>
        <p
          className={`group-hover:w-full group-hover:rounded-none w-8 rounded-l-xl overflow-clip absolute bottom-0 right-0 px-3 pt-2 pb-1 ${
            isProtocol ? "bg-primary" : "bg-secondary"
          } text-white font-semibold text-sm transition-all duration-150`}
        >
          {isProtocol ? "Protocolar" : "Extra"}
        </p>
      </div>
      <p className="max-w-[240px] text-ellipsis line-clamp-2 text-sm mt-1 font-mono">
        {documentName}
      </p>
    </div>
  );
};
