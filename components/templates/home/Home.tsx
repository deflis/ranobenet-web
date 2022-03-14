import { useFirebaseUser } from '~/modules/utils/firebase/auth';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { pageLogin, pageNovels, pageUsers } from '~/modules/utils/path';
import { pageEditNovelCreate, pageEditUserMe } from '~/modules/utils/path/edit';
import { pagesPath } from '~/modules/utils/$path';
import { Toggle } from '~/components/atoms/common/Toggle';
import { useAtom } from 'jotai';
import { darkModeAtom } from '~/modules/theme/dark';
import { useCallback } from 'react';

export const Home = () => {
  const user = useFirebaseUser();

  return (
    <>
      <NextLinkButton href={pageUsers()}>ユーザー一覧</NextLinkButton>
      <NextLinkButton href={pageNovels()}>小説一覧</NextLinkButton>
      {!user && <NextLinkButton href={pageLogin()}>ログイン</NextLinkButton>}
      {user && <NextLinkButton href={pageEditUserMe()}>ユーザー情報を編集する</NextLinkButton>}
      {user && <NextLinkButton href={pageEditNovelCreate()}>新しい小説を書く</NextLinkButton>}
      {user && <NextLinkButton href={pagesPath.edit.novels.$url()}>投稿した小説</NextLinkButton>}
    </>
  );
};
