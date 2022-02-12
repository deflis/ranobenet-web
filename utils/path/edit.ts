import { pagesPath } from '../$path';

export const pageEditUserMe = () => pagesPath.edit.users.me.$url();
export const pageEditNovelCreate = () => pagesPath.edit.novels.new.$url();
export const pageEditNovelUpdate = (novelId: number) => pagesPath.edit.novels._novelId(novelId).$url();
export const pageEditNovelEpisodeCreate = (novelId: number) => pagesPath.edit.novels._novelId(novelId).episodes.$url();
export const pageEditNovelEpisodeUpdate = (novelId: number, episodeId: number) =>
  pagesPath.edit.novels._novelId(novelId).episodes._episodeId(episodeId).$url();
