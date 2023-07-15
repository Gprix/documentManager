import { BaseNodeProps } from "./BaseNode.types";

export const BaseNode = (props: BaseNodeProps) => {
  const { children, className = "", contentClassName = "" } = props;
  const { editable = true } = props;

  return (
    <div
      className={[
        "BaseNode",
        "hover:cursor-pointer group-hover:bg-gray-50",
        "rounded-lg bg-transparent inline flex-grow overflow-clip",
        "transition-colors duration-150",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "w-full h-full transition-colors duration-150",
          "hover:bg-gray-200",
          contentClassName,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
};
