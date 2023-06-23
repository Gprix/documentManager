import { auth, db } from "@/config/firebase.config";
import { WriteTemplatePayload } from "./template.service.types";
import { doc, getDoc, query, where } from "firebase/firestore";
import { setDoc, getDocs, collection } from "firebase/firestore";

export const updateTemplate = async (
  uid: string,
  payload: WriteTemplatePayload
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const { templateData } = payload;
    if (!templateData) return;

    await setDoc(doc(db, "templates", uid), {
      ...payload,
      templateData: templateData,
    });
  } catch (e) {
    console.log(e);
  }
};

export const writeTemplate = async (payload: WriteTemplatePayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const uid = crypto.randomUUID();
    await setDoc(doc(db, "templates", uid), {
      ...payload,
      uid,
      authorId: user.uid,
    });

    return uid;
  } catch (e) {}
};

export const getTemplatesInWorkspace = async (workspaceId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const templatesRef = collection(db, "templates");
    const q = query(templatesRef, where("workspaceId", "==", workspaceId));

    const querySnapshot = await getDocs(q);
    const templatesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return templatesData;
  } catch (e) {
    console.log(e);
  }
};

export const getTemplate = async (uid: string) => {
  try {
    const docRef = doc(db, "templates", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log(e);
  }
};
