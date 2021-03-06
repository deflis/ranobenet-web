import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { fetchUsers, prefetchUser, useUserFetcher } from '~/modules/data/users';
import { User } from '~/components/templates/users/User';
import { QueryClient, dehydrate } from 'react-query';
import { PropsDehydratedState } from '../_app';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';
import { Loading } from '~/components/atoms/common/Loading';

type Props = {
  userId: number;
};
export interface Query extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: (await fetchUsers(1)).items.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props & PropsDehydratedState, Query> = async (context) => {
  const userId = parseInt(context.params!.id, 10);

  return {
    props: {
      userId,
      dehydratedState: dehydrate(await prefetchUser(new QueryClient(), userId)),
    },
    revalidate: 60 * 60 * 10,
  };
};

const Page: NextPage<Props, Query> = ({ userId }) => {
  const { user, loading } = useUserFetcher(userId);
  return (
    <GlobalContainer>
      <Loading enable={loading} />
      <User user={user} />
    </GlobalContainer>
  );
};

export default Page;
