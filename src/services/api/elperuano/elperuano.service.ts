import { cloudinary } from "@/config/cloudinary.config";
import { auth, db } from "@/config/firebase.config";
import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Publication, PublicationPayload } from "./elperuano.service.types";
import { getBase64 } from "@/utils/file.utils";

const { cloudName, uploadPreset } = cloudinary;

export const publishDocument = async (payload: PublicationPayload) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const { nodeDocumentId, file } = payload;

    let fileReference: string | undefined;

    if (file) {
      const base64 = await getBase64(file);

      const upload = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          file: base64,
          upload_preset: uploadPreset,
        },
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      fileReference = upload.data.secure_url;
    }

    // save reference document in firebase
    const uid = crypto.randomUUID();
    const publication: Publication = {
      uid,
      nodeDocumentId: nodeDocumentId ?? null,
      fileReference: fileReference ?? null,
      status: "pending",
    };
    await setDoc(doc(db, "publications", uid), publication);

    return publication;
  } catch (e) {
    console.log(e);
  }
};

export const updatePublicationStatus = async (
  uid: string,
  status: Publication["status"]
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    await setDoc(doc(db, "publications", uid), { status }, { merge: true });
  } catch (e) {
    console.log(e);
  }
};

export const getPublication = async (uid: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const pubRef = doc(db, "publications", uid);
    const pubSnap = await getDoc(pubRef);
    return pubSnap.data() as Publication;
  } catch (e) {
    console.log(e);
  }
};
