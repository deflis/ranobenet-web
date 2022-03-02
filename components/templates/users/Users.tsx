import Head from 'next/head';
import Link from 'next/link';
import { UserDtoForPublicListingPagedList } from '~/ranobe-net-api/@types';
import { globalTitle } from '~/modules/utils/constants';
import { pageUserDetail, pageUsers } from '~/modules/utils/path';
import { Pagination } from '~/components/atoms/common/Pagination';

export const Users: React.FC<{ page: number; users: UserDtoForPublicListingPagedList | undefined }> = ({
  page,
  users,
}) => {
  return (
    <>
      <Head>
        <title>ユーザー一覧 - {globalTitle}</title>
      </Head>
      {users && (
        <>
          <p>ユーザー 全{users.totalCount}件</p>
          {users.items.map((user) => (
            <p key={user.id}>
              <Link href={pageUserDetail(user.id)}>{user.name}</Link>
            </p>
          ))}
          <Pagination pagedList={users} createHref={pageUsers} />
        </>
      )}
    </>
  );
};
