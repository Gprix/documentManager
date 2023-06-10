import { TemplateListProps } from "./TemplateList.types";

export const TemplatesList = (props: TemplateListProps) => {
  const { templates } = props;

  return (
    <ul role="toolbar" className="flex items-center overflow-x-auto">
      {templates.map((template) => {
        const { id, name } = template;

        return (
          <li key={id}>
            <button className="block rounded-lg bg-primary w-[128px] h-[128px]">
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
