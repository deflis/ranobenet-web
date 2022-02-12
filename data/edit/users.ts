import { useAsyncFn } from 'react-use';
import useSWRImmutable from 'swr/immutable';
import { useUserContext } from '~/utils/firebase/auth';
import { UsersApiClient } from '~/utils/apiClient';
import { FirebaseUser, getAuthHeader } from '../firebaseAuth';
import { UserDtoForSave } from '~/api';

export const useEditUser = () => {
  const firebaseUser = useUserContext();
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
  UsersApiClient.apiV1UsersMeGet({
    headers: await getAuthHeader(user),
  });

export const postUser = async (userDtoForSave: UserDtoForSave, user: FirebaseUser) =>
  UsersApiClient.apiV1UsersMePut(
    { userDtoForSave },
    {
      headers: {
        'content-type': 'application/json',
        ...(await getAuthHeader(user)),
      },
    }
  );
