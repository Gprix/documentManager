import { DocumentToolboxProps } from "./DocumentToolbox.types";
import { ToolboxTopButton } from "../ToolboxTopButton/ToolboxTopButton";
import { editMenuOptions, fileMenuOptions } from "./DocumentToolbox.helpers";
import { viewMenuOptions } from "./DocumentToolbox.helpers";

export const DocumentToolbox = (props: DocumentToolboxProps) => {
  const { className = "" } = props;

  return (
    <div className={`DocumentToolbox bg-primaryLight ${className}`}>
      <div className="flex gap-x-2 px-3 pt-2">
        <ToolboxTopButton contextMenuConfiguration={fileMenuOptions}>
          Archivo
        </ToolboxTopButton>
        <ToolboxTopButton contextMenuConfiguration={editMenuOptions}>
          Editar
        </ToolboxTopButton>
        <ToolboxTopButton contextMenuConfiguration={viewMenuOptions}>
          Ver
        </ToolboxTopButton>
      </div>
      {/* <div className="flex px-3 pt-2">
        <button>L</button>
        <button>R</button>
        <button>Print</button>
        <p>|</p>
        <button>-</button>
        <p>100%</p>
        <button>+</button>
      </div> */}
    </div>
  );
};
