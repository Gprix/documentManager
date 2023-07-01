/**
 * Notification interface
 *
 * @interface Notification
 * @property {string} uid - Unique identifier
 * @property {string} description - Notification description
 * @property {string} type - Notification type
 * @property {boolean} isRead - Notification read status
 * @property {string[]} destination - Notification destination uids
 */
export interface Notification {
  uid: string;
  description: string;
  type: "success" | "error" | "warning" | "info";
  isRead: boolean;
  destination: string[];
<<<<<<< HEAD
  createdAt: Date;
=======
>>>>>>> cd82156 (fix(global): split function newAction())
}
