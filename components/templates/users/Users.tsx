import Head from 'next/head';
import Link from 'next/link';
import { UserDtoForPublicListingPagedList } from '~/ranobe-net-api';
import { globalTitle } from '~/utils/constants';
import { pageUserDetail, pageUsers } from '~/utils/path';

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
          <p>
            {users.hasPrevious && <Link href={pageUsers(page - 1)}>{'<'}</Link>}
            {users?.currentPage} {users.hasNext && <Link href={pageUsers(page + 1)}>{'>'}</Link>}
          </p>
        </>
      )}
    </>
  );
};
