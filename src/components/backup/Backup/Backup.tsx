"use client";

import { useEffect, useState } from "react";
import { BackupProps } from "./Backup.types";
import Checkbox from "@/components/shared/Checkbox/Checkbox";
import Button from "@/components/shared/Button/Button";
import { getDocumentsInWorkspace } from "@/services/document/document.service";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { compressData, generateSHA } from "@/utils/backup.utils";
import { getAppointments } from "@/services/appointment/appointment.service";
import { getNotifications } from "@/services/notifications/notifications.service";
import { getTemplatesInWorkspace } from "@/services/template/template.service";
import { getDatablocksInWorkspace } from "@/services/datablocks/datablocks.service";
import { WriteBackupPayload } from "@/services/backup/backup.service.types";
import { getLastBackup, writeBackup } from "@/services/backup/backup.service";
import { createErrorNotification } from "@/utils/notifications.utils";
import { createSuccessNotification } from "@/utils/notifications.utils";
import { BackupList } from "../BackupList/BackupList";
import { Backup as BackupType } from "@/types/backup.types";
import { formatDate } from "@/utils/date.utils";

export const Backup = (props: BackupProps) => {
  const { className = "" } = props;
  const { selectedWorkspace } = useWorkspace();
  const { uid: workspaceId } = selectedWorkspace ?? {};
  const [backupContent, setBackupContent] = useState<Record<string, boolean>>(
    {}
  );
  const [lastBackup, setLastBackup] = useState<BackupType>();

  useEffect(() => {
    if (!workspaceId) return;

    const retrieveLastBackup = async () => {
      const _lastBackup = await getLastBackup(workspaceId);
      setLastBackup(_lastBackup);
    };

    retrieveLastBackup();
  }, [workspaceId]);

  const handleCheckboxChange = (identifier: string, checked: boolean) =>
    setBackupContent((prev) => ({ ...prev, [identifier]: checked }));

  const handleBackup = async () => {
    if (!workspaceId) return;

    const backup: WriteBackupPayload = {
      name: `Backup ${Date.now().toString()}`,
      workspaceId,
      savedData: {},
    };

    if (backupContent["backup-documents"]) {
      const documents = await getDocumentsInWorkspace(workspaceId);
      const documentsSHA = generateSHA(documents);
      const compressedDocuments = compressData(documents);

      backup.savedData["backup-documents"] = {
        data: compressedDocuments,
        sha: documentsSHA,
      };
    }
    if (backupContent["backup-appointments"]) {
      const appointments = getAppointments();
      const appointmentsSHA = generateSHA(appointments);
      const compressedAppointments = compressData(appointments);

      backup.savedData["backup-appointments"] = {
        data: compressedAppointments,
        sha: appointmentsSHA,
      };
    }
    if (backupContent["backup-notifications"]) {
      const notifications = getNotifications();
      const notificationsSHA = generateSHA(notifications);
      const compressedNotifications = compressData(notifications);

      backup.savedData["backup-notifications"] = {
        data: compressedNotifications,
        sha: notificationsSHA,
      };
    }
    if (backupContent["backup-templates"]) {
      const templates = getTemplatesInWorkspace(workspaceId);
      const templatesSHA = generateSHA(templates);
      const compressedTemplates = compressData(templates);

      backup.savedData["backup-templates"] = {
        data: compressedTemplates,
        sha: templatesSHA,
      };
    }
    if (backupContent["backup-datablocks"]) {
      const datablocks = getDatablocksInWorkspace(workspaceId);
      const datablocksSHA = generateSHA(datablocks);
      const compressedDatablocks = compressData(datablocks);

      backup.savedData["backup-datablocks"] = {
        data: compressedDatablocks,
        sha: datablocksSHA,
      };
    }

    const newBackup = await writeBackup(backup);
    if (!newBackup) {
      createErrorNotification("No se pudo crear la copia de seguridad");
      return;
    }
    createSuccessNotification("Copia de seguridad creada correctamente");
  };

  return (
    <section className={`Backup flex w-full ${className}`}>
      <section className="p-6 w-1/2">
        <h1 className="text-2xl font-bold">Copias de seguridad</h1>
        <p className="text-sm text-slate-400">
          {lastBackup
            ? `La última copia se realizó el ${formatDate(
                lastBackup.createdAt,
                "dd/MM/yyyy"
              )} a las ${formatDate(lastBackup.createdAt, "hh:mm:ss")}`
            : null}
        </p>

        <div className="flex mt-6 mb-4 justify-between items-center">
          <p>Frecuencia</p>
          <select
            name=""
            id=""
            className="rounded-lg pl-2 pr-6 py-2 hover:cursor-pointer"
          >
            <option value="0">Ninguna</option>
            <option value="1">Diaria</option>
            <option value="2">Semanal</option>
            <option value="3">Mensual</option>
          </select>
        </div>

        <div className="bg-white rounded-lg p-4">
          <Checkbox
            customOnChange={handleCheckboxChange}
            identifier="backup-documents"
            label="Archivo notarial"
          />
          <Checkbox
            customOnChange={handleCheckboxChange}
            identifier="backup-appointments"
            label="Citas"
          />
          <Checkbox
            customOnChange={handleCheckboxChange}
            identifier="backup-notifications"
            label="Historial de notificaciones"
          />
          <Checkbox
            customOnChange={handleCheckboxChange}
            identifier="backup-templates"
            label="Plantillas notariales"
          />
          <Checkbox
            customOnChange={handleCheckboxChange}
            identifier="backup-datablocks"
            label="Bloques de texto"
          />
        </div>

        <Button onClick={() => handleBackup()} className="mt-4 w-full">
          Nueva copia de seguridad
        </Button>
      </section>
      <BackupList />
    </section>
  );
};
