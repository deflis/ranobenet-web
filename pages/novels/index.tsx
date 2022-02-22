import type { GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { NovelsApiCleint } from '~/utils/apiClient';
import { NovelDtoForPublicListingPagedList } from '~/ranobe-net-api';
import { useNovelsFetcher } from '~/data/novels';
import { Novels } from '~/components/templates/novels/Novels';
import { Loading } from '~/components/atoms/common/Loading';

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

const Page: NextPage<Props> = ({ page, novels: prefetchedNovels }) => {
  const { loading, novels } = useNovelsFetcher(page, prefetchedNovels);

  return (
    <>
      <Loading enable={loading} />
      {novels && <Novels novels={novels} />}
    </>
  );
};

export default Page;
