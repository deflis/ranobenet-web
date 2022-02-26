import { useFirebaseUser } from '~/modules/utils/firebase/auth';
import { apiClient } from '~/modules/utils/apiClient';
import { FirebaseUser, getAuthHeader } from '~/modules/utils/firebase/auth';
import { UserDtoForSave } from '~/ranobe-net-api/@types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useEditUser = () => {
  const firebaseUser = useFirebaseUser();
  const queryClient = useQueryClient();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery('users/me', async () => getUser(firebaseUser!), {
    enabled: !!firebaseUser,
  });

  const { mutate, isLoading: postLoading } = useMutation(
    async (body: UserDtoForSave) => await postUser(body, firebaseUser!),
    {
      onSuccess: (body) => {
        queryClient.setQueryData('users/me', body);
      },
    }
  );

  const loading = isLoading || postLoading;

  return { user, loading, error, update: mutate, loggedOut: !firebaseUser };
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
