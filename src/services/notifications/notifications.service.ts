import { auth, db } from "@/config/firebase.config";
import { doc, where, query, setDoc, deleteDoc } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { WriteNotificationPayload } from "./notifications.service.types";

export const writeNotification = async (payload: WriteNotificationPayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const uid = crypto.randomUUID();
    await setDoc(doc(db, "notifications", uid), {
      ...payload,
      uid,
      isRead: false,
      destination: payload.destination ?? [user.uid],
      createdAt: Date.now().toString(),
    });

    return uid;
  } catch (e) {
    console.log(e);
  }
};

export const getNotifications = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("destination", "array-contains-any", user.uid)
    );

    const querySnapshot = await getDocs(q);
    const notificationsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return notificationsData;
  } catch (e) {
    console.log(e);
  }
};

export const deleteNotification = async (uid: string) => {
  try {
    await deleteDoc(doc(db, "notifications", uid));
  } catch (e) {
    console.log(e);
  }
};
