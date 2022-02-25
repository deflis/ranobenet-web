import { useAsyncFn } from 'react-use';
import useSWRImmutable from 'swr/immutable';
import { useFirebaseUser } from '~/modules/utils/firebase/auth';
import { apiClient } from '~/modules/utils/apiClient';
import { FirebaseUser, getAuthHeader } from '../firebaseAuth';
import { UserDtoForSave } from '~/ranobe-net-api/@types';

export const useEditUser = () => {
  const firebaseUser = useFirebaseUser();
  const {
    data: user,
    error,
    mutate,
  } = useSWRImmutable(firebaseUser ? 'users/me' : null, async () => (firebaseUser ? getUser(firebaseUser) : undefined));

  const [{ loading: postLoading }, update] = useAsyncFn(
    async (user: UserDtoForSave) => {
      if (firebaseUser) {
        mutate(await postUser(user, firebaseUser));
      }
    },
    [firebaseUser, mutate]
  );

  const loading = (firebaseUser && !user && !error) || postLoading;

  return { user, loading, error, update, loggedOut: !firebaseUser };
};

export const getUser = async (user: FirebaseUser) =>
  apiClient.api.v1.users.me.$post({
    config: {
      headers: await getAuthHeader(user),
    },
  });

export const postUser = async (userDtoForSave: UserDtoForSave, user: FirebaseUser) =>
  apiClient.api.v1.users.me.$put({
    body: userDtoForSave,
    config: {
      headers: await getAuthHeader(user),
    },
  });
