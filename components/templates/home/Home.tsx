import Head from 'next/head';
import NextLink from 'next/link';
import { useFirebaseUser } from '~/utils/firebase/auth';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { pageLogin, pageNovels, pageUsers } from '~/utils/path';
import { pageEditNovelCreate, pageEditUserMe } from '~/utils/path/edit';
import { pagesPath } from '~/utils/$path';

export const Home = () => {
  const user = useFirebaseUser();

  return (
    <>
      <Head>
        <title>らのべねっと</title>
      </Head>

      <NextLink href={pageUsers()}>ユーザー一覧</NextLink>
      <NextLink href={pageNovels()}>小説一覧</NextLink>
      {!user && <NextLinkButton href={pageLogin()}>ログイン</NextLinkButton>}
      {user && <NextLinkButton href={pageEditUserMe()}>ユーザー情報を編集する</NextLinkButton>}
      {user && <NextLinkButton href={pageEditNovelCreate()}>新しい小説を書く</NextLinkButton>}
      {user && <NextLinkButton href={pagesPath.edit.novels.$url()}>投稿した小説</NextLinkButton>}
    </>
  );
};
