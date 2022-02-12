import { pagesPath } from '../$path';

export const pageNovels = (page?: number) => ({ ...pagesPath.novels.$url(), query: { page } });
export const pageNovelDetail = (novelId: number) => pagesPath.novels._novelId(novelId).$url();
export const pageNovelEpisode = (novelId: number, episodeId: number) =>
  pagesPath.novels._novelId(novelId)._episodeId(episodeId).$url();
