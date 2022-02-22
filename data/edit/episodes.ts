import { useAsyncFn } from 'react-use';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { FirebaseUser, getAuthHeader } from '~/data/firebaseAuth';
import { useUserContext } from '~/utils/firebase/auth';
import { getNovel, getSWRKeyForNovel } from './novels';
import { apiClient } from '~/utils/apiClient';
import { EpisodeDtoForMe, EpisodeDtoForSave } from '~/ranobe-net-api/@types';

const getSWRKeyForEpisode = (novelId: number, episodeId: number) => `edit/novels/${novelId}/${episodeId}` as const;

export const useCreateEpisode = (novelId: number, onSubmitted: (body: EpisodeDtoForMe) => void) => {
  const firebaseUser = useUserContext();
  const { mutate } = useSWRConfig();

  const { data: novel, error: errorNovel } = useSWRImmutable(
    firebaseUser ? getSWRKeyForNovel(novelId) : null,
    async () => (firebaseUser ? getNovel(novelId, firebaseUser) : undefined)
  );

  const [{ loading: postLoading, error: errorEpisode }, create] = useAsyncFn(
    async (body: EpisodeDtoForSave) => {
      if (firebaseUser) {
        const episode = await createEpisode(novelId, body, firebaseUser);
        mutate(getSWRKeyForEpisode(novelId, episode.id!), episode);
        onSubmitted(episode);
      }
    },
    [firebaseUser, mutate, onSubmitted]
  );

  const error = errorEpisode ?? errorNovel;
  const loading = postLoading;

  return { novel, loading, error, create, loggedOut: !firebaseUser };
};

export const useUpdateEpisode = (novelId: number, episodeId: number) => {
  const firebaseUser = useUserContext();
  const {
    data: episode,
    error: errorEpisode,
    mutate,
  } = useSWRImmutable(firebaseUser ? getSWRKeyForEpisode(novelId, episodeId) : null, async () =>
    firebaseUser ? getEpisode(novelId, episodeId, firebaseUser) : undefined
  );

  const { data: novel, error: errorNovel } = useSWRImmutable(
    firebaseUser ? getSWRKeyForNovel(novelId) : null,
    async () => (firebaseUser ? getNovel(novelId, firebaseUser) : undefined)
  );

  const [{ loading: postLoading }, update] = useAsyncFn(
    async (episode: EpisodeDtoForSave) => {
      if (firebaseUser) {
        await mutate(await updateEpisode(novelId, episodeId, episode, firebaseUser));
      }
    },
    [firebaseUser, mutate, novelId, episodeId]
  );

  const error = errorEpisode ?? errorNovel;
  const loading = (firebaseUser && !episode && !novel && !error) || postLoading;

  return { novel, episode, loading, error, update, loggedOut: !firebaseUser };
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
