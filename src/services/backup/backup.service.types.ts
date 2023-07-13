import { Backup } from "@/types/backup.types";

export interface WriteBackupPayload extends Omit<Backup, "uid" | "createdAt"> {}
