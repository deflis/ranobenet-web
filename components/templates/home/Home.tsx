import Head from 'next/head';
import NextLink from 'next/link';
import { useUserContext } from '~/utils/firebase/auth';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { pageLogin, pageNovels, pageUsers } from '~/utils/path';
import { pageEditUserMe } from '~/utils/path/edit';

export const Home = () => {
  const user = useUserContext();

  return (
    <>
      <Head>
        <title>らのべねっと</title>
      </Head>

      <NextLink href={pageUsers()}>ユーザー一覧</NextLink>
      <NextLink href={pageNovels()}>小説一覧</NextLink>
      {!user && <NextLinkButton href={pageLogin()}>ログイン</NextLinkButton>}
      {user && <NextLinkButton href={pageEditUserMe()}>ユーザー情報を編集する</NextLinkButton>}
    </>
  );
};
