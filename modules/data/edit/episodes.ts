import { FirebaseUser, getAuthHeader } from '~/modules/utils/firebase/auth';
import { useFirebaseUser } from '~/modules/utils/firebase/auth';
import { getNovel, getNovelKey } from './novels';
import { apiClient } from '~/modules/utils/apiClient';
import { EpisodeDtoForMe, EpisodeDtoForSave } from '~/ranobe-net-api/@types';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';

const getEpisodeKey = (novelId: number, episodeId: number) => `edit/novels/${novelId}/${episodeId}` as const;

export const useCreateEpisode = (novelId: number, onSubmitted: (body: EpisodeDtoForMe) => void) => {
  const firebaseUser = useFirebaseUser();
  const queryClient = useQueryClient();

  const {
    data: novel,
    error: errorNovel,
    isLoading,
  } = useQuery(getNovelKey(novelId), async () => getNovel(novelId, firebaseUser!), {
    enabled: !!firebaseUser,
  });

  const { mutate, isLoading: isLoadingMutate } = useMutation(
    async (body: EpisodeDtoForSave) => await createEpisode(novelId, body, firebaseUser!),
    {
      onSuccess: (body) => {
        queryClient.setQueryData(getEpisodeKey(novelId, body.id), body);
        onSubmitted(body);
      },
    }
  );

  const error = errorNovel;
  const loading = isLoading && isLoadingMutate;

  return { novel, loading, error, create: mutate, loggedOut: !firebaseUser };
};

export const useUpdateEpisode = (novelId: number, episodeId: number) => {
  const firebaseUser = useFirebaseUser();
  const queryClient = useQueryClient();
  const [{ data: episode, error: errorEpisode, isLoading }, { data: novel, error: errorNovel }] = useQueries([
    {
      queryKey: getEpisodeKey(novelId, episodeId),
      queryFn: async () => await getEpisode(novelId, episodeId, firebaseUser!),
      enabled: !!firebaseUser,
    },
    {
      queryKey: getNovelKey(novelId),
      queryFn: async () => getNovel(novelId, firebaseUser!),
      enabled: !!firebaseUser,
    },
  ]);

  const { mutate, isLoading: isLoadingMutate } = useMutation(
    async (body: EpisodeDtoForSave) => {
      if (firebaseUser) return await createEpisode(novelId, body, firebaseUser);
      throw new Error();
    },
    {
      onSuccess: (body) => {
        queryClient.setQueryData(getEpisodeKey(novelId, body.id), body);
      },
    }
  );

  const error = errorEpisode ?? errorNovel;
  const loading = isLoading || isLoadingMutate;

  return { novel, episode, loading, error, update: mutate, loggedOut: !firebaseUser };
};

export const getEpisode = async (novelId: number, episodeId: number, user: FirebaseUser) =>
  apiClient.api.v1.novels
    ._id(novelId)
    .episodes._episodeId(episodeId)
    .$get({
      config: {
        headers: await getAuthHeader(user),
      },
    });

export const createEpisode = async (novelId: number, episodeDtoForSave: EpisodeDtoForSave, user: FirebaseUser) =>
  apiClient.api.v1.novels._id(novelId).episodes.$post({
    body: episodeDtoForSave,
    config: {
      headers: await getAuthHeader(user),
    },
  });

export const updateEpisode = async (
  novelId: number,
  episodeId: number,
  episodeDtoForSave: EpisodeDtoForSave,
  user: FirebaseUser
) =>
  apiClient.api.v1.novels
    ._id(novelId)
    .episodes._episodeId(episodeId)
    .$put({
      body: episodeDtoForSave,
      config: {
        headers: await getAuthHeader(user),
      },
    });
