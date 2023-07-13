export interface BackupCardBadgeProps {
  className?: string;
  type: "in progress" | "done" | "error";
}

export interface BackupCardProps {
  className?: string;
  uid: string;
  name: string;
  createdAt: string;
}
