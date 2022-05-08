import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { NovelDtoForMe } from '~/ranobe-net-api/@types';
import { Heading } from '~/components/atoms/common/Heading';
import { Loading } from '~/components/atoms/common/Loading';
import { NovelData, NovelEditor } from '~/components/organism/edit/novels/NovelEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useCreateNovel } from '~/modules/data/edit/novels';
import { globalTitle } from '~/modules/utils/constants';
import { pageEditNovelUpdate } from '~/modules/utils/path/edit';
import { toast } from 'react-toastify';
import { MiddleContainer } from '~/components/atoms/common/Container';

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
    ({ useAuthorName, author, ...data }: NovelData) => {
      toast.promise(
        create({
          author: useAuthorName ? author : undefined,
          ...data,
        }),
        {
          pending: '更新中',
          success: '更新しました',
          error: '失敗しました',
        }
      );
    },
    [create]
  );

  return (
    <>
      <Head>
        <title>新規小説の投稿 - {globalTitle}</title>
      </Head>
      <MiddleContainer>
        <Heading>新規小説の投稿</Heading>
        {loggedOut && <NeedLogin label='新規小説の投稿' />}
        {!loading && <NovelEditor onClickOk={handleClickOk} />}
      </MiddleContainer>
    </>
  );
};
