export * from './users';
export * from './novels';
import { pagesPath } from '../$path';

export const pageIndex = () => pagesPath.$url();
export const pageLogin = () => pagesPath.users.login.$url();
