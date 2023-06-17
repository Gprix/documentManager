import { auth, db } from "@/config/firebase.config";
import { doc, where, query, setDoc } from "firebase/firestore";
import { getDoc, getDocs, collection } from "firebase/firestore";
import { WriteDataBlockPayload } from "./datablocks.service.types";

export const writeDatablock = async (payload: WriteDataBlockPayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const uid = crypto.randomUUID();
    await setDoc(doc(db, "datablocks", uid), {
      ...payload,
      uid,
      authorId: user.uid,
    });

    return uid;
  } catch (e) {
    console.log(e);
  }
};

export const getDatablock = async (uid: string) => {
  try {
    const docRef = doc(db, "datablocks", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log(e);
  }
};

export const getDatablocksInWorkspace = async (workspaceId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const datablocksRef = collection(db, "datablocks");
    const q = query(datablocksRef, where("workspaceId", "==", workspaceId));

    const querySnapshot = await getDocs(q);
    const datablocksData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return datablocksData;
  } catch (e) {
    console.log(e);
  }
};
