import { db, auth } from "@/config/firebase.config";
import { doc, where, query, setDoc } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { WriteWorkspacePayload } from "./workspace.service.types";

export const writeWorkspace = async (payload: WriteWorkspacePayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    await setDoc(doc(db, "workspaces", crypto.randomUUID()), {
      ...payload,
      ownerUid: user.uid,
    });
  } catch (e) {
    console.error(e);
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
      where("ownerUid", "==", auth.currentUser?.uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });

    const workspacesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return workspacesData;
  } catch (e) {
    console.error(e);
  }
};
