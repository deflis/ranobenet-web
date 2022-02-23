import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase } from '.';
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut as signOutFirebaseAuth,
} from 'firebase/auth';
import { atom, useAtom } from 'jotai';

const auth = getAuth(firebase);
const currentUser = atom(auth.currentUser);

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  setPersistence(auth, browserSessionPersistence);
  const { user } = await signInWithPopup(auth, provider);
  return user;
}

export async function signOut() {
  signOutFirebaseAuth(auth);
}

export const useFirebaseUser = () => {
  const [user] = useAtom(currentUser);
  return user;
};

export const useAuthStateListener = () => {
  const [, setUser] = useAtom(currentUser);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
};
