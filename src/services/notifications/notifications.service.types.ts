import { Notification } from "@/types/notifications.types";

export interface WriteNotificationPayload
  extends Omit<Notification, "uid" | "isRead" | "destination" | "createdAt"> {
  destination?: string[];
}
