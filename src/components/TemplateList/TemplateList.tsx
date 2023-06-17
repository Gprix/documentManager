"use client";

import { writeDocument } from "@/services/document/document.service";
import { TemplateListProps } from "./TemplateList.types";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { useRouter } from "next/navigation";

export const TemplatesList = (props: TemplateListProps) => {
  const { push } = useRouter();
  const { selectedWorkspace } = useWorkspace();
  const { templates } = props;

  const buttonHandler = async () => {
    if (!selectedWorkspace) return;

    const newDocument = await writeDocument({
      title: `Doc-${Date.now().toString()}`,
      workspaceId: selectedWorkspace.uid,
      documentData: [],
    });

    if (!newDocument) return;
    push(`/workspace/workshop/${newDocument}`);
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
