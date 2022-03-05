import { EpisodeDtoForPublic, NovelDtoForPublic, NovelDtoForPublicListingPagedList } from '~/ranobe-net-api/@types';
import { apiClient } from '../utils/apiClient';
import { QueryClient, useQuery } from 'react-query';
import { NovelLines, parse } from '../utils/parser';
import { atomWithQuery } from 'jotai/query';
import { atom } from 'jotai';

export const createNovelsKey = (page?: number) => ['novels', page] as const;
export const fetchNovels = (page?: number) =>
  apiClient.api.v1.novels.$get({ query: { page: page ?? 1, size: 10, descending: true, order: 'id' } });

export const createNovelKey = (id: number) => ['novel', id] as const;
export const fetchNovel = (id: number) => apiClient.api.v1.novels._id(id).$get();
export const createNovelEpisodeKey = (id: number, episodeId: number) => ['episode', id, episodeId] as const;

type NovelEpisode = {
  episode: Omit<EpisodeDtoForPublic, 'story'>;
  story: NovelLines;
  chapter: {
    type: 'NonChapter' | 'Chapter';
    title?: string | null;
  };
  prevEpisode: Omit<EpisodeDtoForPublic, 'story'> | undefined;
  nextEpisode: Omit<EpisodeDtoForPublic, 'story'> | undefined;
};

export const prefetchNovels = async (queryClient: QueryClient, page: number) => {
  await queryClient.prefetchQuery(createNovelsKey(page), async () => fetchNovels(page));
  return queryClient;
};

export const useNovelsFetcher = (page: number, prefetchedData?: NovelDtoForPublicListingPagedList) => {
  const { data, error, isLoading } = useQuery(createNovelsKey(page), async () => fetchNovels(page), {
    initialData: prefetchedData,
  });

  return {
    loading: isLoading,
    error,
    novels: data,
  };
};

export const prefetchNovel = async (queryClient: QueryClient, id: number) => {
  await queryClient.prefetchQuery(createNovelKey(id), async () => fetchNovel(id));
  return queryClient;
};

export const useNovelFetcher = (id: number, prefetchedData?: NovelDtoForPublic) => {
  const { data, error } = useQuery(createNovelKey(id), async () => fetchNovel(id), {
    initialData: prefetchedData,
  });

  const loading = !data && !error;

  return {
    loading,
    error,
    novel: data,
  };
};

const convertEpisode = (data: NovelDtoForPublic, episodeId: number): NovelEpisode => {
  const { episodes, ...chapter } = data.chapters?.find((chapter) =>
    chapter.episodes.some((episode) => episode.id === episodeId)
  ) ?? { type: 'error' };
  const { story, ...episode } = episodes?.find((episode) => episode.id === episodeId) ?? { id: -1, title: '' };
  if (chapter.type === 'error' || episode.id === -1 || !story) {
    throw new Error();
  }
  const allEpisodes = data.chapters.flatMap((chapter) => chapter.episodes);
  const episodeKey = allEpisodes.findIndex((episode) => episode.id === episodeId);
  const hasPrevEpisode = episodeKey - 1 in allEpisodes;
  const hasNextEpisode = episodeKey + 1 in allEpisodes;
  const { story: _1, ...prevEpisode } = allEpisodes?.[episodeKey - 1] ?? {};
  const { story: _2, ...nextEpisode } = allEpisodes?.[episodeKey + 1] ?? {};

  return {
    episode,
    story: parse(story),
    chapter,
    prevEpisode: hasPrevEpisode ? prevEpisode : undefined,
    nextEpisode: hasNextEpisode ? nextEpisode : undefined,
  };
};

const wait = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 0);
  });
};

export const prefetchNovelEpisode = async (queryClient: QueryClient, novelId: number, episodeId: number) => {
  await queryClient.prefetchQuery(createNovelEpisodeKey(novelId, episodeId), async () => {
    const data = await fetchNovel(novelId);
    return convertEpisode(data, episodeId);
  });

  return queryClient;
};
export const useNovelEpisodeFetcher = (novelId: number, episodeId: number) => {
  const { data, error, isSuccess } = useQuery({
    queryKey: createNovelKey(novelId),
    queryFn: async () => fetchNovel(novelId),
  });
  useQuery(
    createNovelEpisodeKey(novelId, episodeId),
    async () => {
      await wait();
      if (data) {
        return convertEpisode(data, episodeId);
      }
    },
    {
      enabled: isSuccess && !!data,
    }
  );
  const { data: episodeData, isIdle, isLoading } = useQuery<NovelEpisode>(createNovelEpisodeKey(novelId, episodeId));

  return {
    loading: isIdle || isLoading,
    error,

    ...episodeData,
  };
};
