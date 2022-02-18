import { Configuration, UsersApi, NovelsApi } from '~/api';

const conf = new Configuration({
  basePath: 'https://api.ranobe.net',
  headers: {
    'content-type': 'application/json',
  },
});

export const UsersApiClient = new UsersApi(conf);
export const NovelsApiCleint = new NovelsApi(conf);
