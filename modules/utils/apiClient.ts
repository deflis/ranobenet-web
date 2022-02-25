import fetchClient from '@aspida/fetch';
import api from '~/ranobe-net-api/$api';

export const apiClient = api(
  fetchClient(fetch, {
    baseURL: 'https://api.ranobe.net',
    throwHttpErrors: true,
    headers: {
      'content-type': 'application/json',
    },
  })
);
