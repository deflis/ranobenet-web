import { FirebaseUser, getAuthHeader } from '~/modules/utils/firebase/auth';
import { useFirebaseUser } from '~/modules/utils/firebase/auth';
import { getNovel, getNovelKey } from './novels';
import { apiClient } from '~/modules/utils/apiClient';
import { EpisodeDtoForMe, EpisodeDtoForSave } from '~/ranobe-net-api/@types';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { createNovelKey } from '../novels';
import { getChaptersKey } from './chapters';

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

  const { mutateAsync, isLoading: isLoadingMutate } = useMutation(
    async (body: EpisodeDtoForSave) => await createEpisode(novelId, body, firebaseUser!),
    {
      onSuccess: async (body) => {
        queryClient.setQueryData(getEpisodeKey(novelId, body.id), body);
        onSubmitted(body);
        await queryClient.invalidateQueries(getChaptersKey(novelId));
      },
    }
  );

  const error = errorNovel;
  const loading = isLoading && isLoadingMutate;

  return { novel, loading, error, create: mutateAsync, loggedOut: !firebaseUser };
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

  const { mutateAsync, isLoading: isLoadingMutate } = useMutation(
    async (body: EpisodeDtoForSave) => {
      if (firebaseUser) return await updateEpisode(novelId, episodeId, body, firebaseUser);
      throw new Error();
    },
    {
      onSuccess: async (body) => {
        queryClient.setQueryData(getEpisodeKey(novelId, body.id), body);
        await queryClient.invalidateQueries(getChaptersKey(novelId));
      },
    }
  );

  const error = errorEpisode ?? errorNovel;
  const loading = isLoading || isLoadingMutate;

  return { novel, episode, loading, error, update: mutateAsync, loggedOut: !firebaseUser };
};

export const useDeleteEpisode = (novelId: number) => {
  const firebaseUser = useFirebaseUser();
  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isLoading: isLoading,
    error,
  } = useMutation(
    async (episodeId: number) => {
      if (firebaseUser) return await deleteEpisode(novelId, episodeId, firebaseUser);
      throw new Error();
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(getNovelKey(novelId));
        await queryClient.invalidateQueries(createNovelKey(novelId));
        await queryClient.invalidateQueries(getChaptersKey(novelId));
      },
    }
  );

  const loading = isLoading;

  return { loading, error, delete: mutateAsync, loggedOut: !firebaseUser };
};

export const getEpisode = async (novelId: number, episodeId: number, user: FirebaseUser) =>
  apiClient.api.v1.novels
    ._id(novelId)
    .episodes._episodeId(episodeId)
    .me.$get({
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

export const deleteEpisode = async (novelId: number, episodeId: number, user: FirebaseUser) =>
  apiClient.api.v1.novels
    ._id(novelId)
    .episodes._episodeId(episodeId)
    .$delete({
      config: {
        headers: await getAuthHeader(user),
      },
    });
