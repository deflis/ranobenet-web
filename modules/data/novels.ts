import { NovelDtoForPublic, NovelDtoForPublicListingPagedList } from '~/ranobe-net-api/@types';
import { apiClient } from '~/modules/utils/apiClient';
import { QueryClient, useQuery } from 'react-query';
import { parse } from '../utils/parser';

export const createNovelKey = (id: number): string => `get/novels/${id}` as const;
export const fetchNovel = (id: number) => apiClient.api.v1.novels._id(id).$get();

export const createNovelsKey = (page?: number): string => `get/novels?page=${page}` as const;
export const fetchNovels = (page?: number) =>
  apiClient.api.v1.novels.$get({ query: { page: page ?? 1, size: 10, descending: true, order: 'id' } });

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

export const useNovelEpisodeFetcher = (id: number, episodeId: number, prefetchedData?: NovelDtoForPublic) => {
  const { data, error } = useQuery(createNovelKey(id), async () => fetchNovel(id), {
    initialData: prefetchedData,
  });

  const loading = !data && !error;

  if (!loading && data) {
    const episodes = data.chapters?.flatMap((chapter) => chapter.episodes ?? []) ?? [];
    const episode = episodes.find((episode) => episode.id === episodeId);
    const episodeKey = episodes.findIndex((episode) => episode.id === episodeId);
    const prevEpisode = episodes?.[episodeKey - 1];
    const nextEpisode = episodes?.[episodeKey + 1];

    const { data: story } = useQuery(['episode', data.id, episode?.id], () => parse(episode?.story ?? ''));

    return {
      loading,
      error,

      episode,
      story,
      prevEpisode,
      nextEpisode,
    };
  } else {
    return {
      loading,
      error,
    };
  }
};
