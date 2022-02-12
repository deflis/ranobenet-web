import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase } from '.';
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  User,
  signOut as signOutFirebaseAuth,
} from 'firebase/auth';

type UserContextData = User | null;

const UserContext = createContext<UserContextData>(null);

export function useUserContext(): UserContextData {
  return useContext(UserContext);
}

const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  setPersistence(auth, browserSessionPersistence);
  const { user } = await signInWithPopup(auth, provider);
  return user;
}

export async function signOut() {
  signOutFirebaseAuth(auth);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
