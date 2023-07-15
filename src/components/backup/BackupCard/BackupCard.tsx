"use client";

import Image from "next/image";

import DropdownArrowSVG from "images/icons/dropdown-arrow.svg";
import BackupCardBadge from "./BackupCardBadge";
import { useState } from "react";
import { BackupCardProps } from "./BackupCard.types";
import { formatDate } from "@/utils/date.utils";
import { Backup } from "@/types/backup.types";
import { getBackup } from "@/services/backup/backup.service";

const BackupCard = (props: BackupCardProps) => {
  const { className = "" } = props;
  const { uid, name, createdAt } = props;
  const [showInfo, setShowInfo] = useState(false);
  const [backupData, setBackupData] = useState<Backup>();

  const handleShowInfo = async () => {
    if (!backupData) {
      const _backupData = await getBackup(uid);
      setBackupData(_backupData as Backup);
    }
    setShowInfo((prev) => !prev);
  };

  const renderRow = (name: string) => (
    <div className="flex items-center">
      <BackupCardBadge className="scale-75" type="done" />
      <p className="text-sm">{name}</p>
    </div>
  );

  const renderInfo = () => {
    if (!backupData) return null;
    const { savedData } = backupData;

    return (
      <>
        {"backup-documents" in savedData ? renderRow("Documentos") : null}
        {"backup-appointments" in savedData ? renderRow("Citas") : null}
        {"backup-notifications" in savedData
          ? renderRow("Notificaciones")
          : null}
        {"backup-templates" in savedData ? renderRow("Plantillas") : null}
        {"backup-datablocks" in savedData
          ? renderRow("Bloques de datos")
          : null}
      </>
    );
  };

  return (
    <div
      className={`BackupCard bg-white rounded-lg p-4 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BackupCardBadge type="done" />
          <div>
            <p>{name}</p>
            <p className="text-xs text-slate-400">{formatDate(createdAt)}</p>
          </div>
        </div>
        <button onClick={() => handleShowInfo()}>
          <Image
            src={DropdownArrowSVG}
            alt=""
            className={[
              "transition-all duration-150",
              showInfo ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>
      </div>
      {showInfo ? <div className="mt-4">{renderInfo()}</div> : null}
    </div>
  );
};

export default BackupCard;
