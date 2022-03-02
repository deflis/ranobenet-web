import type { GetStaticProps, NextPage } from 'next';
import { prefetchUsers, useUsersFetcher } from '~/modules/data/users';
import { Users } from '~/components/templates/users/Users';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient } from 'react-query';
import { PropsDehydratedState } from '../_app';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';

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
      dehydratedState: dehydrate(await prefetchUsers(new QueryClient(), page)),
    },
    revalidate: 60 * 60 * 10,
  };
};

const Page: NextPage<Props> = ({ page }) => {
  const { users } = useUsersFetcher(page);
  return (
    <GlobalContainer>
      <Users users={users} />
    </GlobalContainer>
  );
};

export default Page;
