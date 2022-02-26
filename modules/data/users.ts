import { FirebaseUser } from './firebaseAuth';
import { apiClient } from '~/modules/utils/apiClient';
import { QueryClient, useQuery } from 'react-query';

export const fetchMe = async (user: FirebaseUser) =>
  await apiClient.api.v1.users.me.$post({
    config: {
      headers: {
        authorization: `Bearer ${await user.getIdToken()}`,
      },
    },
  });

export const useUserMe = (user: FirebaseUser | null) => {
  const { data, error } = useQuery(
    `post/user/${user?.uid}`,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => (user && fetchMe(user)) ?? undefined
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

export const prefetchUser = async (queryClient: QueryClient, id: number) => {
  await queryClient.prefetchQuery(createUsersKey(id), async () => await fetchUser(id));
  return queryClient;
};

export const useUserFetcher = (id: number) => {
  const { data, error } = useQuery(createUserKey(id), async () => await fetchUser(id));

  const loading = !data && !error;

  return {
    loading,
    error,
    user: data,
  };
};

export const prefetchUsers = async (queryClient: QueryClient, page: number) => {
  await queryClient.prefetchQuery(createUsersKey(page), async () => await fetchUsers(page));
  return queryClient;
};

export const useUsersFetcher = (page: number) => {
  const { data, error } = useQuery(createUsersKey(page), async () => await fetchUsers(page));

  const loading = !data && !error;

  return {
    loading,
    error,
    users: data,
  };
};
