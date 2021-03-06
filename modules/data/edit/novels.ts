import { FirebaseUser, getAuthHeader } from '~/modules/utils/firebase/auth';
import { useFirebaseUser } from '~/modules/utils/firebase/auth';
import { apiClient } from '~/modules/utils/apiClient';
import { NovelDtoForMe, NovelDtoForSave } from '~/ranobe-net-api/@types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const getMyNovelsKey = (firebaseUid: string | undefined) => `users/${firebaseUid}/novels` as const;

export const useNovelList = (page?: number) => {
  const firebaseUser = useFirebaseUser();

  const { data: novels, error } = useQuery(getMyNovelsKey(firebaseUser?.uid), () => getNovelList(firebaseUser!, page), {
    enabled: !!firebaseUser,
  });

  const loading = !!firebaseUser && !novels && !error;

  return { loading, error, novels, loggedOut: !firebaseUser };
};

export const getNovelKey = (novelId: number) => `edit/novels/${novelId}` as const;

export const useCreateNovel = (onSubmitted: (body: NovelDtoForMe) => void) => {
  const firebaseUser = useFirebaseUser();
  const queryClient = useQueryClient();

  const { mutateAsync, error, isLoading } = useMutation(
    async (body: NovelDtoForSave) => await createNovel(body, firebaseUser!),
    {
      onSuccess: (body) => {
        queryClient.setQueryData(getNovelKey(body.id), body);
        onSubmitted(body);
      },
    }
  );
  const loading = isLoading;

  return { loading, error, create: mutateAsync, loggedOut: !firebaseUser };
};

export const useUpdateNovel = (novelId: number) => {
  const firebaseUser = useFirebaseUser();
  const queryClient = useQueryClient();

  const { data: novel, error } = useQuery(getNovelKey(novelId), async () => await getNovel(novelId, firebaseUser!), {
    enabled: !!firebaseUser,
  });

  const { mutateAsync, isLoading } = useMutation(
    async (body: NovelDtoForSave) => await updateNovel(novelId, body, firebaseUser!),
    {
      onSuccess: (body) => {
        queryClient.setQueryData(getNovelKey(body.id), body);
      },
    }
  );
  const loading = (firebaseUser && !novel && !error) || isLoading;

  return { novel, loading, error, update: mutateAsync, loggedOut: !firebaseUser };
};

export const getNovelList = async (user: FirebaseUser, page?: number) =>
  apiClient.api.v1.users.me.novels.$get({
    query: { page: page ?? 1, size: 10, descending: true, order: 'id' },
    config: {
      headers: {
        ...(await getAuthHeader(user)),
      },
    },
  });

export const getNovel = async (id: number, user: FirebaseUser) =>
  apiClient.api.v1.novels._id(id).me.$get({
    config: {
      headers: {
        ...(await getAuthHeader(user)),
      },
    },
  });

export const createNovel = async (novelDtoForSave: NovelDtoForSave, user: FirebaseUser) =>
  apiClient.api.v1.novels.$post({
    body: novelDtoForSave,
    config: {
      headers: {
        ...(await getAuthHeader(user)),
      },
    },
  });

export const updateNovel = async (id: number, novelDtoForSave: NovelDtoForSave, user: FirebaseUser) =>
  apiClient.api.v1.novels._id(id).$put({
    body: novelDtoForSave,
    config: {
      headers: {
        ...(await getAuthHeader(user)),
      },
    },
  });
