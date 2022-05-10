import Head from 'next/head';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { MiddleContainer } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import { EpisodeListEditor } from '~/components/organism/edit/novels/EpisodeListEditor';
import { NovelData, NovelEditor } from '~/components/organism/edit/novels/NovelEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useUpdateNovel } from '~/modules/data/edit/novels';
import { globalTitle } from '~/modules/utils/constants';

export const UpdateNovel: React.FC<{ novelId: number }> = ({ novelId }) => {
  const { novel, loading, update, loggedOut } = useUpdateNovel(novelId);

  const handleClickOk = useCallback(
    ({ useAuthorName, author, ...data }: NovelData) => {
      toast.promise(
        update({
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
    [update]
  );

  const values = useMemo<NovelData | undefined>(
    () =>
      novel
        ? {
            ...novel,
            useAuthorName: !!novel.author,
            author: novel.author ?? '',
          }
        : undefined,
    [novel]
  );

  return (
    <>
      <Head>
        <title>
          小説の編集 - {novel?.title} - {globalTitle}
        </title>
      </Head>
      <MiddleContainer>
        <Heading>小説情報の編集</Heading>
        {loggedOut && <NeedLogin label='小説情報の編集' />}
        {values && <NovelEditor defaultValues={values} onClickOk={handleClickOk} />}
        {!loggedOut && <EpisodeListEditor novelId={novelId} />}
      </MiddleContainer>
    </>
  );
};
