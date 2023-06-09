import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADbPsyeUyk2-gNJGRH1ElMavrcsNOOAvY",
  authDomain: "document-manager-9f349.firebaseapp.com",
  databaseURL: "https://document-manager-9f349-default-rtdb.firebaseio.com",
  projectId: "document-manager-9f349",
  storageBucket: "document-manager-9f349.appspot.com",
  messagingSenderId: "107346734275",
  appId: "1:107346734275:web:2eed9927e6c9f1e4be4676",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
