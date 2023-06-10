import { BaseNodeProps } from "./BaseNode.types";

export const BaseNode = (props: BaseNodeProps) => {
  const { children, className = "" } = props;

  return (
    <div className="BaseNode rounded-lg hover:cursor-pointer bg-transparent group-hover:bg-gray-50 transition-colors duration-150 inline flex-grow overflow-clip">
      <div
        className={`w-full h-full hover:bg-gray-200 transition-colors duration-150 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
