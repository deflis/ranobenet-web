import { User } from '@firebase/auth';

export type FirebaseUser = User;

export const getAuthHeader = async (user: User) => ({
  authorization: `Bearer ${await user.getIdToken()}` as const,
});
