export interface Backup {
  uid: string;
  name: string;
  createdAt: string;
  savedData: BackupSaveData;
  workspaceId: string;
}

export type BackupSaveDataKeys =
  | "backup-documents"
  | "backup-appointments"
  | "backup-notifications"
  | "backup-templates"
  | "backup-datablocks";

export interface BackupSaveData {
  [identifier: string]: {
    data: string;
    sha: string;
  };
}
