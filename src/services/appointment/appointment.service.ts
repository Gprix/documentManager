import { auth, db } from "@/config/firebase.config";
import { collection, doc, getDocs } from "firebase/firestore";
import { query, setDoc, where } from "firebase/firestore";
import { WriteAppointmentPayload } from "./appointment.service.types";

export const writeAppointment = async (payload: WriteAppointmentPayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const uid = crypto.randomUUID();
    await setDoc(doc(db, "appointments", uid), {
      ...payload,
      uid,
    });

    return uid;
  } catch (e) {
    console.error(e);
  }
};

export const getAppointments = async () => {
  const collectionRef = collection(db, "appointments");
  const querySnapshot = await getDocs(collectionRef);

  const appointmentsData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  return appointmentsData;
};

export const getAppointmentsByUser = async (uid: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const appointmentsRef = collection(db, "appointments");
    const q = query(appointmentsRef, where("assignedTo", "==", uid));

    const querySnapshot = await getDocs(q);
    const appointmentsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return appointmentsData;
  } catch (e) {
    console.error(e);
  }
};
