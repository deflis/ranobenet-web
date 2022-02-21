import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { pagesPath } from '~/utils/$path';
import Link from 'next/link';
import { Container } from '~/components/atoms/common/Container';
import { NovelsApiCleint } from '~/utils/apiClient';
import { NovelDtoForPublicListingPagedList } from '~/ranobe-net-api';
import { useNovelsFetcher } from '~/data/novels';

type Props = {
  page: number;
  novels: NovelDtoForPublicListingPagedList;
};
export interface Query extends ParsedUrlQuery {
  page?: string;
}

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  const page = parseInt(context.params?.page ?? '1', 10) || 1;
  const novels = await NovelsApiCleint.apiV1NovelsGet({ page });
  return {
    props: {
      page,
      novels,
    },
    revalidate: 60 * 60 * 10,
  };
};

const Novels: NextPage<Props> = ({ page, novels: prefetchedNovels }) => {
  const { novels } = useNovelsFetcher(page, prefetchedNovels);
  return (
    <>
      <Head>
        <title>小説一覧</title>
      </Head>

      <Container>
        {novels && (
          <>
            <p>小説 全{novels.totalCount}件</p>

            {novels.items.map((novel) => (
              <p key={novel.id}>
                <Link href={pagesPath.novels._novelId(novel.id).$url()}>{novel.title}</Link>
              </p>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Novels;
