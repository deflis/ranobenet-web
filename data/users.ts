import useSWR from 'swr';
import { FirebaseUser } from './firebaseAuth';
import { UsersApiClient } from '~/utils/apiClient';
import { UserDtoForPublic, UserDtoForPublicListingPagedList } from '~/api';

export const fetchMe = async (user: FirebaseUser) =>
  await UsersApiClient.apiV1UsersMePost({
    headers: {
      authorization: `Bearer ${await user.getIdToken()}`,
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
export const fetchUser = (id: number) => UsersApiClient.apiV1UsersIdGet({ id });

export const createUsersKey = (page?: number): string => `get/users?page=${page}` as const;
export const fetchUsers = (page?: number) => UsersApiClient.apiV1UsersGet({ page: page ?? 1, size: 10 });

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
