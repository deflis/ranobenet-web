import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useNovelFetcher } from '~/data/novels';
import { ApiV1NovelsGetOrderEnum, NovelDtoForPublic } from '~/ranobe-net-api';
import { NovelsApiCleint } from '~/utils/apiClient';
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
  const novel = await NovelsApiCleint.apiV1NovelsGet({ order: ApiV1NovelsGetOrderEnum.Id, descending: true });

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
  const novel = await NovelsApiCleint.apiV1NovelsIdGet({ id: novelId });
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
