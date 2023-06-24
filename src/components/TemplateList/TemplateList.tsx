"use client";

import { TemplateListProps } from "./TemplateList.types";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";

export const TemplatesList = (props: TemplateListProps) => {
  const { selectedWorkspace } = useWorkspace();
  const { templates } = props;

  const buttonHandler = async () => {
    if (!selectedWorkspace) return;
  };

  return (
    <ul role="toolbar" className="flex items-center overflow-x-auto">
      {templates.map((template) => {
        const { id, name } = template;

        return (
          <li key={id}>
            <button
              className="block rounded-lg bg-primary w-[128px] h-[128px]"
              onClick={() => buttonHandler()}
            >
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
