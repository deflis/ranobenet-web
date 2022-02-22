import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { fetchNovel, useNovelFetcher } from '~/data/novels';
import { NovelDtoForPublic } from '~/ranobe-net-api/@types';
import { apiClient } from '~/utils/apiClient';
import { Novel } from '~/components/templates/novels/Novel';
import { Loading } from '~/components/atoms/common/Loading';

type Props = {
  novelId: number;
  novel: NovelDtoForPublic;
};

export interface Query extends ParsedUrlQuery {
  novelId: string;
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const novel = await await apiClient.api.v1.novels.$get({
    query: { order: 'id', descending: true, size: 10, page: 1 },
  });

  return {
    paths: [
      ...novel.items.map(({ id }) => ({
        params: {
          novelId: id.toString(),
        },
      })),
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  const novelId = parseInt(context.params?.novelId ?? '', 10) || 1;
  const novel = await fetchNovel(novelId);
  return {
    props: {
      novelId,
      novel,
    },
    revalidate: 60 * 60 * 10,
  };
};

const Page: NextPage<Props> = ({ novelId, novel: prefetchedNovel }) => {
  const { loading, novel } = useNovelFetcher(novelId, prefetchedNovel);

  return (
    <>
      <Loading enable={loading} />
      {novel && <Novel novel={novel} />}
    </>
  );
};

export default Page;
