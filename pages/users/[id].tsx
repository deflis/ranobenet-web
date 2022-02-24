import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { fetchUser, fetchUsers } from '~/data/users';
import { User } from '~/components/templates/users/User';
import { UserDtoForPublic } from '~/ranobe-net-api/@types';

type Props = {
  user: UserDtoForPublic;
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

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = parseInt(context.params!.id, 10);

  return {
    props: {
      user: await fetchUser(userId),
    },
    revalidate: 60 * 60 * 10,
  };
};

const Page: NextPage<Props, Query> = ({ user }) => {
  return <User user={user} />;
};

export default Page;
