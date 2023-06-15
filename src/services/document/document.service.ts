import { auth, db } from "@/config/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { WriteDocumentPayload } from "./document.services.types";

export const updateDocument = async (
  uid: string,
  payload: WriteDocumentPayload
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const { documentData } = payload;
    if (documentData === null) return;

    console.log({ payload });

    // const flattenedDocumentData = JSON.stringify(documentData);

    await setDoc(doc(db, "documents", uid), {
      ...payload,
      documentData: documentData,
    });
  } catch (e) {
    console.log(e);
  }
};

export const writeDocument = async (payload: WriteDocumentPayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const uid = crypto.randomUUID();
    await setDoc(doc(db, "documents", uid), {
      ...payload,
      uid,
      authorId: user.uid,
    });

    return uid;
  } catch (e) {
    console.log(e);
  }
};

export const getDocument = async (uid: string) => {
  try {
    const docRef = doc(db, "documents", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log(e);
  }
};
