"use client";

import Image from "next/image";
import { TextBlockNodeProps } from "./TextBlockNode.types";
import DropDownArrowSVG from "../../../../../public/images/icons/dropdown-arrow.svg";
import { BaseNode } from "../BaseNode/BaseNode";
import { useEffect, useState, useMemo } from "react";
import { useLayoutEffect, MouseEvent } from "react";
import { useDocument } from "@/contexts/document/document.context.hooks";
import { SecondaryMenu } from "@/components/shared/SecondaryMenu/SecondaryMenu";
import { useDatablocks } from "@/contexts/datablocks/datablocks.context.hooks";

export const TextBlockNode = (props: TextBlockNodeProps) => {
  const { className = "" } = props;
  const { data, rowIndex, inlineIndex, onNodeUpdate } = props;
  const { selectedDocument } = useDocument();
  const { selectedDatablocks } = useDatablocks();
  const [blockEntryId, setBlockEntryId] = useState<string | null>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const [textValue, setTextValue] = useState("");
  const isCursorPastMiddle = useMemo(() => {
    return origin.x > window.innerWidth / 2;
  }, [origin]);

  const handleUpdate = (e: MouseEvent<HTMLDivElement>) => {
    if (!selectedDocument) return;
    setOrigin({ x: e.pageX, y: e.pageY });
    setShowSecondaryMenu(true);
  };

  useLayoutEffect(() => {
    if (!selectedDocument) return;
  }, [selectedDocument]);

  useLayoutEffect(() => {
    if (!data) return;

    const { blockEntryId } = data;
    setBlockEntryId(blockEntryId);
  }, [data]);

  useEffect(() => {
    if (!blockEntryId) return;

    const datablock = selectedDatablocks?.find(
      (datablock) => datablock.uid === blockEntryId
    );

    if (!datablock) return;

    const { value } = datablock;
    setTextValue(value);
  }, [blockEntryId, selectedDatablocks]);

  return (
    <>
      <BaseNode className={`TextBlockNode pl-3 pr-1 pt-2 pb-1 ${className}`}>
        <div
          className="flex justify-between items-start"
          onClick={(e) => handleUpdate(e)}
        >
          <p className="text-black font-light text-sm">
            {textValue === "" ? "Seleccione un bloque de datos..." : textValue}
          </p>
          <Image src={DropDownArrowSVG} alt="" className="pl-2 pt-[0.1rem]" />
        </div>
      </BaseNode>
      {showSecondaryMenu ? (
        <SecondaryMenu
          className="w-[20rem] max-w-[20rem]"
          top={origin.y}
          // TODO: find a way to calculate the width of the menu
          left={!isCursorPastMiddle ? origin.x - 140 : origin.x - 320 - 140}
          onDismiss={() => setShowSecondaryMenu(false)}
        >
          <ul role="listbox">
            {!selectedDatablocks || !selectedDatablocks.length ? (
              <p className="px-3 py-2">No se han encontrado bloques de datos</p>
            ) : null}
            {selectedDatablocks?.map((datablock) => {
              const { uid, value } = datablock;

              const actionHandler = () => {
                setBlockEntryId(uid);
                setTextValue(value);

                onNodeUpdate({
                  rowIndex,
                  inlineIndex,
                  isFullLine: false,
                  type: "textBlock",
                  blockEntryId: uid,
                });

                setShowSecondaryMenu(false);
              };

              return (
                <li key={uid}>
                  <button
                    className="context-menu__item"
                    onClick={() => actionHandler()}
                  >
                    {value}
                  </button>
                </li>
              );
            })}
          </ul>
        </SecondaryMenu>
      ) : null}
    </>
  );
};
