import useSWR from 'swr';
import { FirebaseUser } from './firebaseAuth';
import { apiClient } from '~/utils/apiClient';
import { UserDtoForPublic, UserDtoForPublicListingPagedList } from '~/ranobe-net-api/@types';

export const fetchMe = async (user: FirebaseUser) =>
  await apiClient.api.v1.users.me.$post({
    config: {
      headers: {
        authorization: `Bearer ${await user.getIdToken()}`,
      },
    },
  });

export const useUserMe = (user: FirebaseUser | null) => {
  const { data, error } = useSWR(
    () => (user ? `post/user/${user.uid}` : null),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => fetchMe(user!)
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    user: data,
  };
};

export const createUserKey = (id: number): string => `get/users/${id}` as const;
export const fetchUser = (id: number) => apiClient.api.v1.users._id(id).$get();

export const createUsersKey = (page?: number): string => `get/users?page=${page}` as const;
export const fetchUsers = (page?: number) =>
  apiClient.api.v1.users.$get({ query: { page: page ?? 1, size: 10, descending: true, order: 'id' } });

export const useUserFetcher = (id: number, prefetchedData?: UserDtoForPublic) => {
  const { data, error } = useSWR(createUserKey(id), async () => await fetchUser(id), {
    fallbackData: prefetchedData,
  });

  const loading = !data && !error;

  return {
    loading,
    error,
    user: data,
  };
};

export const useUsersFetcher = (page: number, prefetchedData?: UserDtoForPublicListingPagedList) => {
  const { data, error } = useSWR(createUsersKey(page), async () => await fetchUsers(page), {
    fallbackData: prefetchedData,
  });

  const loading = !data && !error;

  return {
    loading,
    error,
    users: data,
  };
};
