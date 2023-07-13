import { NotificationType } from "@/types/notifications.types";

/**
 * NotificationSettings component props.
 *
 * @param {string} className - Custom className.
 */
export interface NotificationSettingsProps {
  /** Custom className. */
  className?: string;
}

export interface NotificationCardProps {
  className?: string;
  description: string;
  createdAt: string;
  type: NotificationType;
}
