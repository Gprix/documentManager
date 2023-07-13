import { BackupCardBadgeProps } from "./BackupCard.types";

const BackupCardBadge = (props: BackupCardBadgeProps) => {
  const { className = "", type } = props;

  const badgeInfo = (type: string) => {
    switch (type) {
      case "done":
        return "Backup completado!";
      case "in progress":
        return "En progreso...";
      case "error":
        return "Error en el backup";
    }
  };

  return (
    <div
      className={[
        "BackupCardBadge",
        "rounded-full w-4 h-4 mr-4",
        type === "done" ? "bg-green-400" : "",
        type === "in progress" ? "bg-amber-400" : "",
        type === "error" ? "bg-red-400" : "",
        className,
      ].join(" ")}
      title={badgeInfo(type)}
    />
  );
};

export default BackupCardBadge;
