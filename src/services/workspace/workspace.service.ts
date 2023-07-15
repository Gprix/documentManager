import { db, auth } from "@/config/firebase.config";
import { doc, where, query, setDoc, getDoc, or } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { WriteWorkspacePayload } from "./workspace.service.types";

export const writeWorkspace = async (payload: WriteWorkspacePayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const uid = crypto.randomUUID();
    await setDoc(doc(db, "workspaces", uid), {
      ...payload,
      uid,
      ownerUid: user.uid,
      members: [user.uid],
    });
  } catch (e) {
    console.error(e);
  }
};

export const getWorkspace = async (uid: string) => {
  try {
    const docRef = doc(db, "workspaces", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.log(e);
  }
};

export const getWorkspaces = async () => {
  const collectionRef = collection(db, "workspaces");
  const querySnapshot = await getDocs(collectionRef);

  const workspacesData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));

  return workspacesData;
};

export const getCurrentUserWorkspaces = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const workspacesRef = collection(db, "workspaces");
    const q = query(
      workspacesRef,
      or(
        where("ownerUid", "==", auth.currentUser?.uid),
        where("members", "array-contains", auth.currentUser?.uid)
      )
    );

    const querySnapshot = await getDocs(q);

    const workspacesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return workspacesData;
  } catch (e) {
    console.error(e);
  }
};
