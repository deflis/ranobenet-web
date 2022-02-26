import { useEffect } from 'react';
import { firebase } from '.';
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut as signOutFirebaseAuth,
  User,
} from 'firebase/auth';
import { atom, useAtomValue, useSetAtom } from 'jotai';

export type FirebaseUser = User;

const auth = getAuth(firebase);
const currentUserAtom = atom(auth.currentUser);
const provider = new GoogleAuthProvider();

export const getAuthHeader = async (user: FirebaseUser) => ({
  authorization: `Bearer ${await user.getIdToken()}` as const,
});

export async function signInWithGoogle() {
  setPersistence(auth, browserSessionPersistence);
  const { user } = await signInWithPopup(auth, provider);
  return user;
}

export async function signOut() {
  signOutFirebaseAuth(auth);
}

export const useFirebaseUser = () => {
  const user = useAtomValue(currentUserAtom);
  return user;
};

export const useAuthStateListener = () => {
  const setUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
};
