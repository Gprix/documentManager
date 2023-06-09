import { db } from "@/config/firebase.config";
import { Member } from "./member.service.types";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { AuthStatus } from "@/services/auth/auth.service.types";

export const getCurrentUser = async (auth: AuthStatus): Promise<Member> => {
  const collectionRef = collection(db, "members");
  const querySnapshot = await getDocs(collectionRef);

  const userData = querySnapshot.docs
    .filter((doc) => doc.data().uid === auth.uid)
    .map((doc) => ({
      uid: doc.data().uid,
      name: doc.data().name,
      email: doc.data().email,
      documentType: doc.data().document,
      documentNumber: doc.data().documentNumber,
      role: doc.data().role,
      photoURL: doc.data().photoURL,
    }));

  const [user] = userData ?? [];

  return user;
};

export const writeMember = async (payload: Member) => {
  try {
    await setDoc(doc(db, "members", payload.uid), payload);
  } catch (e) {
    console.error(e);
  }
};

export const getMember = async (uid: string) => {
  const docRef = doc(db, "members", uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};
