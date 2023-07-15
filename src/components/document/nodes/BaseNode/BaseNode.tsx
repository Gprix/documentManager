import { BaseNodeProps } from "./BaseNode.types";

export const BaseNode = (props: BaseNodeProps) => {
  const { children, className = "", contentClassName = "" } = props;
  const { editable } = props;

  return (
    <div
      className={[
        "BaseNode",
        editable ? "hover:cursor-pointer group-hover:bg-gray-50" : "",
        "rounded-lg bg-transparent inline flex-grow overflow-clip",
        "transition-colors duration-150",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "w-full h-full transition-colors duration-150",
          editable ? "hover:bg-gray-200" : "",
          contentClassName,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
};
