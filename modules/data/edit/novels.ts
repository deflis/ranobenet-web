import { useAsyncFn } from 'react-use';
import useSWR, { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { FirebaseUser, getAuthHeader } from '~/modules/data/firebaseAuth';
import { useFirebaseUser } from '~/modules/utils/firebase/auth';
import { apiClient } from '~/modules/utils/apiClient';
import { NovelDtoForMe, NovelDtoForSave } from '~/ranobe-net-api/@types';

export const useNovelList = (page?: number) => {
  const firebaseUser = useFirebaseUser();

  const { data: novels, error } = useSWR(firebaseUser ? '/users/me/novels' : null, () =>
    firebaseUser ? getNovelList(firebaseUser, page) : undefined
  );

  const loading = !!firebaseUser && !novels && !error;

  return { loading, error, novels, loggedOut: !firebaseUser };
};

export const getSWRKeyForNovel = (novelId: number) => `/novels/me` as const;

export const useCreateNovel = (onSubmitted: (body: NovelDtoForMe) => void) => {
  const firebaseUser = useFirebaseUser();
  const { mutate } = useSWRConfig();

  const [{ loading: postLoading, error }, create] = useAsyncFn(
    async (body: NovelDtoForSave) => {
      if (firebaseUser) {
        const novel = await createNovel(body, firebaseUser);
        mutate(getSWRKeyForNovel(novel.id), novel);
        onSubmitted(novel);
      }
    },
    [firebaseUser, mutate, onSubmitted]
  );

  const loading = postLoading;

  return { loading, error, create, loggedOut: !firebaseUser };
};

export const useUpdateNovel = (novelId: number) => {
  const firebaseUser = useFirebaseUser();
  const {
    data: novel,
    error,
    mutate,
  } = useSWRImmutable(firebaseUser ? getSWRKeyForNovel(novelId) : null, async () =>
    firebaseUser ? await getNovel(novelId, firebaseUser) : undefined
  );

  const [{ loading: postLoading }, update] = useAsyncFn(
    async (novel: NovelDtoForSave) => {
      if (firebaseUser) {
        await mutate(await updateNovel(novelId, novel, firebaseUser));
      }
    },
    [firebaseUser, mutate, novelId]
  );

  const loading = (firebaseUser && !novel && !error) || postLoading;

  return { novel, loading, error, update, loggedOut: !firebaseUser };
};

export const getNovelList = async (user: FirebaseUser, page?: number) =>
  apiClient.api.v1.users.me.novels.$get({
    query: { page: page ?? 1, size: 10, descending: true, order: 'id' },
    config: {
      headers: {
        ...(await getAuthHeader(user)),
      },
    },
  });

export const getNovel = async (id: number, user: FirebaseUser) =>
  apiClient.api.v1.novels._id(id).me.$get({
    config: {
      headers: {
        ...(await getAuthHeader(user)),
      },
    },
  });

export const createNovel = async (novelDtoForSave: NovelDtoForSave, user: FirebaseUser) =>
  apiClient.api.v1.novels.$post({
    body: novelDtoForSave,
    config: {
      headers: {
        ...(await getAuthHeader(user)),
      },
    },
  });

export const updateNovel = async (id: number, novelDtoForSave: NovelDtoForSave, user: FirebaseUser) =>
  apiClient.api.v1.novels._id(id).$put({
    body: novelDtoForSave,
    config: {
      headers: {
        ...(await getAuthHeader(user)),
      },
    },
  });
