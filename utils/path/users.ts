import { pagesPath } from '../$path';

export const pageUsers = (page?: number) => ({ ...pagesPath.users.$url(), query: { page } });

export const pageUserDetail = (id: number) => pagesPath.users._id(id).$url();
