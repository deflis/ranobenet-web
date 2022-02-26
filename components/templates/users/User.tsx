import Head from 'next/head';
import Link from 'next/link';
import { UserDtoForPublic } from '~/ranobe-net-api/@types';
import { globalTitle } from '~/modules/utils/constants';
import { pageNovelDetail } from '~/modules/utils/path';

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
          <ul>
            {user.novels.map((novel) => (
              <li key={novel.id}>
                <h3>
                  <Link href={pageNovelDetail(novel.id)}>
                    <a>{novel.title}</a>
                  </Link>
                </h3>
                <p>{novel.description}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
