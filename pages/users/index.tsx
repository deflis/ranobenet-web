import type { GetStaticProps, NextPage } from 'next';
import { fetchUsers, useUsersFetcher } from '~/data/users';
import { Users } from '~/components/templates/users/Users';
import { UserDtoForPublicListingPagedList } from '~/ranobe-net-api';
import { ParsedUrlQuery } from 'querystring';

type Props = {
  page: number;
  users: UserDtoForPublicListingPagedList;
};

export interface Query extends ParsedUrlQuery {
  page?: string;
}

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  const page = parseInt(context.params?.page ?? '1', 10) || 1;

  return {
    props: {
      page,
      users: await fetchUsers(page),
    },
  };
};

const Page: NextPage<Props> = ({ page, users: _users }) => {
  const { users } = useUsersFetcher(page);
  // SWR hooks inside the `SWRConfig` boundary will use those values.
  return <Users page={1} users={users} />;
};

export default Page;
