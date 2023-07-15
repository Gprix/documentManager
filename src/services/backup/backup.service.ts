import { auth, db } from "@/config/firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { query, setDoc, where } from "firebase/firestore";
import { WriteBackupPayload } from "./backup.service.types";
import { Backup } from "@/types/backup.types";

export const writeBackup = async (backup: WriteBackupPayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const uid = crypto.randomUUID();
    await setDoc(doc(db, "backups", uid), {
      ...backup,
      uid,
      createdAt: Date.now().toString(),
    });

    return uid;
  } catch (e) {
    console.log(e);
  }
};

export const getBackupsInWorkspace = async (workspaceId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const backupsRef = collection(db, "backups");
    const q = query(backupsRef, where("workspaceId", "==", workspaceId));

    const querySnapshot = await getDocs(q);
    const backupsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return backupsData;
  } catch (e) {
    console.error(e);
  }
};

export const getBackup = async (uid: string) => {
  try {
    const backupRef = doc(db, "backups", uid);
    const backupSnap = await getDoc(backupRef);

    if (backupSnap.exists()) {
      return backupSnap.data();
    }
  } catch (e) {
    console.error(e);
  }
};

export const getLastBackup = async (workspaceId: string) => {
  try {
    const backupsRef = collection(db, "backups");
    const q = query(backupsRef, where("workspaceId", "==", workspaceId));

    const querySnapshot = await getDocs(q);
    const backupsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    const backups = backupsData as Backup[];

    return backups.sort((a: Backup, b: Backup) => {
      return (
        new Date(+b.createdAt).getTime() - new Date(+a.createdAt).getTime()
      );
    })[0];
  } catch (e) {
    console.error(e);
  }
};
