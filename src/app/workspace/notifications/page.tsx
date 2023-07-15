import { NotificationList } from "@/components/notifications/NotificationList/NotificationList";
import { NotificationSettings } from "@/components/notifications/NotificationSettings/NotificationSettings";

const NotificationsPage = () => {
  return (
    <section className="p-6 flex flex-col w-full h-full gap-y-4">
      <h1 className="text-2xl font-bold">Notificaciones</h1>
      <NotificationSettings />
      <NotificationList />
    </section>
  );
};

export default NotificationsPage;
