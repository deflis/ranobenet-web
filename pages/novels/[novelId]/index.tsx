import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { fetchNovel, prefetchNovel, useNovelFetcher } from '~/modules/data/novels';
import { apiClient } from '~/modules/utils/apiClient';
import { Novel } from '~/components/templates/novels/Novel';
import { Loading } from '~/components/atoms/common/Loading';
import { PropsDehydratedState } from '~/pages/_app';
import { dehydrate, QueryClient } from 'react-query';

type Props = {
  novelId: number;
};

export interface Query extends ParsedUrlQuery {
  novelId: string;
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const novel = await apiClient.api.v1.novels.$get({
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

export const getStaticProps: GetStaticProps<Props & PropsDehydratedState, Query> = async (context) => {
  const novelId = parseInt(context.params?.novelId ?? '', 10) || 1;
  return {
    props: {
      novelId,
      dehydratedState: dehydrate(await prefetchNovel(new QueryClient(), novelId)),
    },
    revalidate: 60 * 60 * 10,
  };
};

const Page: NextPage<Props> = ({ novelId }) => {
  const { loading, novel } = useNovelFetcher(novelId);

  return (
    <>
      <Loading enable={loading} />
      {novel && <Novel novel={novel} />}
    </>
  );
};

export default Page;
