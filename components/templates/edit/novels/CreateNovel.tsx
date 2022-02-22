import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { NovelDtoForMe } from '~/ranobe-net-api/@types';
import { Heading } from '~/components/atoms/common/Heading';
import { Loading } from '~/components/atoms/common/Loading';
import { NovelData, NovelEditor } from '~/components/organism/edit/novels/NovelEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useCreateNovel } from '~/data/edit/novels';
import { globalTitle } from '~/utils/constants';
import { pageEditNovelUpdate } from '~/utils/path/edit';

export const CreateNovel: React.FC = () => {
  const router = useRouter();
  const handleCreated = useCallback(
    (novelInfo: NovelDtoForMe) => {
      router.push(pageEditNovelUpdate(novelInfo.id!));
    },
    [router]
  );
  const { loading, create, loggedOut } = useCreateNovel(handleCreated);

  const handleClickOk = useCallback(
    ({ title, description, useAuthorName, author }: NovelData) => {
      return create({
        title,
        description,
        author: useAuthorName ? author : undefined,
      });
    },
    [create]
  );

  return (
    <>
      <Head>
        <title>新規小説の投稿 - {globalTitle}</title>
      </Head>
      <Loading enable={loading} />
      <Heading>新規小説の投稿</Heading>
      {loggedOut && <NeedLogin label='新規小説の投稿' />}
      {!loading && <NovelEditor onClickOk={handleClickOk} />}
    </>
  );
};
