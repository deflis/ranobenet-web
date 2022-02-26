import type { GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { prefetchNovels, useNovelsFetcher } from '~/modules/data/novels';
import { Novels } from '~/components/templates/novels/Novels';
import { Loading } from '~/components/atoms/common/Loading';
import { PropsDehydratedState } from '../_app';
import { dehydrate, QueryClient } from 'react-query';

type Props = {
  page: number;
};

export interface Query extends ParsedUrlQuery {
  page?: string;
}

export const getStaticProps: GetStaticProps<Props & PropsDehydratedState, Query> = async (context) => {
  const page = parseInt(context.params?.page ?? '1', 10) || 1;

  return {
    props: {
      page,
      dehydratedState: dehydrate(await prefetchNovels(new QueryClient(), page)),
    },
    revalidate: 60 * 60 * 10,
  };
};

const Page: NextPage<Props> = ({ page }) => {
  const { loading, novels } = useNovelsFetcher(page);

  return (
    <>
      <Loading enable={loading} />
      {novels && <Novels novels={novels} />}
    </>
  );
};

export default Page;
