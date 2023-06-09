"use client";

import { useEffect, useMemo, useState } from "react";
import { createContext, useCallback } from "react";
import { AuthContextProviderProps } from "./auth.context.types";
import { AuthContextProviderValue } from "./auth.context.types";
import { User, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signInWithCredential } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase.config";

export const AuthContext = createContext<AuthContextProviderValue>(
  // @ts-ignore
  {}
);

export const AuthProvider = (props: AuthContextProviderProps) => {
  const [selectedUser, setSelectedUser] = useState<any>();
  const [uid, setUid] = useState("");

  const authWithEmailAndPassword = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const authWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(response);

    if (!credential || !auth.currentUser) return response;

    await signInWithCredential(auth, credential);
    return response;
  };

  const subscriber = useCallback((user: User | null) => {
    const { uid: userUid } = user ?? {};

    if (userUid) {
      setUid(userUid);
      return;
    }
  }, []);

  useEffect(() => {
    const authSubscriber = auth.onAuthStateChanged(subscriber);
    return authSubscriber;
  }, [subscriber]);

  const value: AuthContextProviderValue = useMemo(() => {
    return {
      uid,
      selectedUser,
      setSelectedUser,
      authWithEmailAndPassword,
      authWithGoogle,
    };
  }, [selectedUser, uid]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
