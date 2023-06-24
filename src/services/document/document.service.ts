import { auth, db } from "@/config/firebase.config";
import { doc, where, query } from "firebase/firestore";
import { setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { WriteDocumentPayload } from "./document.services.types";

export const updateDocument = async (
  uid: string,
  payload: WriteDocumentPayload
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const { documentData } = payload;
    if (!documentData) return;

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

export const getDocumentsInWorkspace = async (workspaceId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docsRef = collection(db, "documents");
    const q = query(docsRef, where("workspaceId", "==", workspaceId));

    const querySnapshot = await getDocs(q);
    const docsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return docsData;
  } catch (e) {
    console.log(e);
  }
};
