"use client";

import { formatDate } from "@/utils/date.utils";
import { NotificationCardProps } from "../NotificationSettings/NotificationSettings.types";
import { NotificationListProps } from "./NotificationList.types";
import { useEffect, useState } from "react";
import { getNotifications } from "@/services/notifications/notifications.service";
import { Notification } from "@/types/notifications.types";

export const NotificationList = (props: NotificationListProps) => {
  const { className = "" } = props;
  const [notifications, setnotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const retrieveNotifications = async () => {
      const _notifications = await getNotifications();
      setnotifications(_notifications as Notification[]);
    };

    retrieveNotifications();
  }, []);

  const NotificationCard = (props: NotificationCardProps) => {
    const { description, createdAt, type } = props;

    return (
      <div
        className={[
          "NotificationCard",
          "rounded-lg shadow bg-white p-4 my-2",
          type === "info" ? "bg-blue-400" : "",
          type === "success" ? "bg-green-400" : "",
          type === "warning" ? "bg-amber-400" : "",
          type === "error" ? "bg-error" : "",
        ].join(" ")}
      >
        <p>{description}</p>
        <p className="text-sm text-slate-400">{formatDate(createdAt)}</p>
      </div>
    );
  };

  return (
    <div
      className={[
        "NotificationList",
        "bg-blue-50 flex-grow rounded-lg p-4 overflow-y-auto",
        className,
      ].join(" ")}
    >
      {notifications?.map((notification) => {
        const { description, uid, createdAt, type } = notification;

        return (
          <NotificationCard
            key={uid}
            description={description}
            createdAt={createdAt}
            type={type}
          />
        );
      })}
    </div>
  );
};
