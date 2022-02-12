import Head from 'next/head';
import Link from 'next/link';
import { UserDtoForPublic } from '~/api';
import { globalTitle } from '~/utils/constants';
import { pageNovelDetail } from '~/utils/path';

export const User: React.FC<{ user: UserDtoForPublic }> = ({ user }) => {
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
