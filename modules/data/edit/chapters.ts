import { FirebaseUser, getAuthHeader } from '~/modules/utils/firebase/auth';
import { useFirebaseUser } from '~/modules/utils/firebase/auth';
import { apiClient } from '~/modules/utils/apiClient';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { ChaptersDtoForSave } from '~/ranobe-net-api/@types';

export const getChaptersKey = (novelId: number) => `edit/novels/${novelId}/chapters` as const;

export const useChapters = (novelId: number) => {
  const firebaseUser = useFirebaseUser();
  const {
    data: chapters,
    error: errorChapters,
    isLoading,
  } = useQuery(getChaptersKey(novelId), async () => await getChapters(novelId, firebaseUser!), {
    enabled: !!firebaseUser,
  });
  const error = errorChapters;
  const loading = isLoading;

  return { chapters, loading, error, loggedOut: !firebaseUser };
};

export const useUpdateChapters = (novelId: number) => {
  const firebaseUser = useFirebaseUser();
  const queryClient = useQueryClient();
  const {
    data: chapters,
    error: errorChapters,
    isLoading,
  } = useQuery(getChaptersKey(novelId), async () => await getChapters(novelId, firebaseUser!), {
    enabled: !!firebaseUser,
  });

  const { mutateAsync, isLoading: isLoadingMutate } = useMutation(
    async (body: ChaptersDtoForSave) => {
      if (firebaseUser) return await updateChapters(novelId, body, firebaseUser);
      throw new Error();
    },
    {
      onSuccess: (body) => {
        queryClient.refetchQueries(getChaptersKey(novelId));
      },
    }
  );

  const error = errorChapters;
  const loading = isLoading || isLoadingMutate;

  return { chapters, loading, error, update: mutateAsync, loggedOut: !firebaseUser };
};

export const getChapters = async (novelId: number, user: FirebaseUser) =>
  apiClient.api.v1.novels._id(novelId).chapters.$get({
    config: {
      headers: await getAuthHeader(user),
    },
  });
export const updateChapters = async (novelId: number, chapterDto: ChaptersDtoForSave, user: FirebaseUser) =>
  apiClient.api.v1.novels._id(novelId).chapters.$post({
    body: chapterDto,
    config: {
      headers: await getAuthHeader(user),
    },
  });
