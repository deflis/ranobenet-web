import Head from 'next/head';
import Link from 'next/link';
import { UserDtoForPublic } from '~/ranobe-net-api/@types';
import { globalTitle } from '~/modules/utils/constants';
import { pageNovelDetail } from '~/modules/utils/path';
import { NovelList } from '~/components/organism/novels/NovelList';

export const User: React.FC<{ user: UserDtoForPublic | undefined }> = ({ user }) => {
  return (
    <>
      {user && (
        <>
          <Head>
            <title>
              {user.name} - {globalTitle}
            </title>
          </Head>

          <h1>{user.name}</h1>

          <NovelList novels={user.novels} />
        </>
      )}
    </>
  );
};
