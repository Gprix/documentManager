import Switch from "@/components/shared/Switch/Switch";
import { NotificationSettingsProps } from "./NotificationSettings.types";

export const NotificationSettings = (props: NotificationSettingsProps) => {
  const { className = "" } = props;

  return (
    <div
      className={[
        NotificationSettings,
        "bg-white rounded-lg p-4",
        className,
      ].join(" ")}
    >
      <Switch
        checked
        identifier="notification-assignment"
        title="Recibirás una notificación cuando se te asigne a algún proceso notarial"
        label="Notificarme de nuevas asignaciones notariales"
      />
      <Switch
        identifier="notification-members"
        title="Recibirás una notificación cuando un miembro se una al espacio de trabajo"
        label="Notificarme de nuevos miembros en el espacio de trabajo"
      />
      <Switch
        identifier="notification-documents"
        title="Recibirás una notificación cuando se realice algún cambio en alguna acta de tu autoría"
        label="Notificarme del estado de mis documentos"
      />
      <Switch
        checked
        identifier="notification-appointments"
        title="Recibirás una notificación cuando se actualice el estado de algún proceso notarial que tengas asignado"
        label="Notificarme del estado de mis procesos notariales asignados"
      />
    </div>
  );
};
