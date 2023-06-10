import { ContextMenuProps } from "./ContextMenu.types";

export const ContextMenu = (props: ContextMenuProps) => {
  const { className = "" } = props;

  return <div className={`ContextMenu ${className}`}></div>;
};
