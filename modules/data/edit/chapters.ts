import { FirebaseUser, getAuthHeader } from '~/modules/utils/firebase/auth';
import { useFirebaseUser } from '~/modules/utils/firebase/auth';
import { getNovel, getNovelKey } from './novels';
import { apiClient } from '~/modules/utils/apiClient';
import { ChaptersDto } from '~/ranobe-net-api/@types';
import { useMutation, useQueries, useQueryClient } from 'react-query';

const getChaptersKey = (novelId: number) => `edit/novels/${novelId}/chapters` as const;

export const useUpdateChapters = (novelId: number) => {
  const firebaseUser = useFirebaseUser();
  const queryClient = useQueryClient();
  const [{ data: chapters, error: errorChapters, isLoading }, { data: novel, error: errorNovel }] = useQueries([
    {
      queryKey: getChaptersKey(novelId),
      queryFn: async () => await getChapters(novelId, firebaseUser!),
      enabled: !!firebaseUser,
    },
    {
      queryKey: getNovelKey(novelId),
      queryFn: async () => getNovel(novelId, firebaseUser!),
      enabled: !!firebaseUser,
    },
  ]);

  const { mutateAsync, isLoading: isLoadingMutate } = useMutation(
    async (body: ChaptersDto) => {
      if (firebaseUser) return await updateChapters(novelId, body, firebaseUser);
      throw new Error();
    },
    {
      onSuccess: (body) => {
        queryClient.fetchQuery(getChaptersKey(novelId));
      },
    }
  );

  const error = errorChapters ?? errorNovel;
  const loading = isLoading || isLoadingMutate;

  return { novel, episode: chapters, loading, error, update: mutateAsync, loggedOut: !firebaseUser };
};

export const getChapters = async (novelId: number, user: FirebaseUser) =>
  apiClient.api.v1.novels._id(novelId).chapters.$get({
    config: {
      headers: await getAuthHeader(user),
    },
  });
export const updateChapters = async (novelId: number, chapterDto: ChaptersDto, user: FirebaseUser) =>
  apiClient.api.v1.novels._id(novelId).chapters.$post({
    body: chapterDto,
    config: {
      headers: await getAuthHeader(user),
    },
  });
