import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase.config";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) return;
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      console.log({ user });
      console.log({ token });
    })
    .catch((error) => {
      // Handle Errors here.
      //   const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      //   const email = error.customData.email;
      // The AuthCredential type that was used.
      //   const credential = GoogleAuthProvider.credentialFromError(error);

      throw new Error(errorMessage);
    });
};
