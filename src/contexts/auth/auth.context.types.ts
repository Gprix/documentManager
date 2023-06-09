import { Dispatch, SetStateAction } from "react";
import firebase from "firebase/auth";

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export interface AuthContextProviderValue {
  uid: string | undefined;
  selectedUser: any | undefined;
  setSelectedUser: Dispatch<SetStateAction<any | undefined>>;
  authWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<Credentials | undefined>;
  authWithGoogle: () => Promise<Credentials>;
}

export type Credentials = firebase.UserCredential;
