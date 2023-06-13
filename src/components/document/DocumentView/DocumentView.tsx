"use client";

import GoBack from "@/components/GoBack/GoBack";
import { DocumentViewProps } from "./DocumentView.types";
import Button from "@/components/shared/Button/Button";
import RightArrowWhiteSVG from "../../../../public/images/icons/right-arrow-white.svg";
import { Paper } from "../Paper/Paper";

export const DocumentView = (props: DocumentViewProps) => {
  const { className = "" } = props;
  // const { documentId } = props;

  return (
    <section className={`DocumentView ${className}`}>
      {/* Top toolbar */}
      <div className="bg-white">
        <div className="DocumentView__controls flex justify-between px-4 pt-6 pb-4 shadow-md">
          <div className="DocumentView__controls--left flex w-full">
            <GoBack />
            <div className="DocumentView__info">
              <p className="text-black text-xl">Nombre del documento</p>
              <p className="text-dimmed">Última modificación por: </p>
            </div>
          </div>
          <Button
            className="DocumentView__button"
            rightIcon={RightArrowWhiteSVG}
          >
            Editar
          </Button>
        </div>
      </div>

      {/* Document */}
      <div className="overflow-y-auto h-screen max-h-screen">
        <Paper className="bg-[#f9f9f9] rounded-none text-black mb-32" />
      </div>
    </section>
  );
};
