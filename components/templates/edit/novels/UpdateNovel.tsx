import Head from 'next/head';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Button, NextLinkButton } from '~/components/atoms/common/Button';
import { InnerContainer, MiddleContainer } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import { Loading } from '~/components/atoms/common/Loading';
import { NovelData, NovelEditor } from '~/components/organism/edit/novels/NovelEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useDeleteEpisode } from '~/modules/data/edit/episodes';
import { useUpdateNovel } from '~/modules/data/edit/novels';
import { useNovelFetcher } from '~/modules/data/novels';
import { pagesPath } from '~/modules/utils/$path';
import { globalTitle } from '~/modules/utils/constants';

export const UpdateNovel: React.FC<{ novelId: number }> = ({ novelId }) => {
  const { novel, loading, update, loggedOut } = useUpdateNovel(novelId);

  const handleClickOk = useCallback(
    ({ title, description, useAuthorName, author }: NovelData) => {
      toast.promise(
        update({
          title,
          description,
          author: useAuthorName ? author : undefined,
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
            title: novel.title,
            description: novel.description,
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
        {!loggedOut && <Episodes novelId={novelId} />}
      </MiddleContainer>
    </>
  );
};

// TODO: あとでちゃんとorganismコンポーネントとして書く
const Episodes: React.FC<{ novelId: number }> = ({ novelId }) => {
  // TODO: NovelDtoForMe で返す
  const { novel } = useNovelFetcher(novelId);
  const { delete: deleteFunc } = useDeleteEpisode(novelId);
  return (
    <ul>
      {novel?.chapters.map((chapter) => (
        <>
          {chapter.type === 'Chapter' && <Heading>{chapter.title}</Heading>}
          {chapter.episodes.map((episode) => (
            <li key={episode.id}>
              {episode.title}
              <NextLinkButton href={pagesPath.edit.novels._novelId(novel.id).episodes._episodeId(episode.id).$url()}>
                編集
              </NextLinkButton>
              <Button onClick={() => deleteFunc(episode.id)}>削除</Button>
            </li>
          ))}
        </>
      ))}
      <li>
        <NextLinkButton href={pagesPath.edit.novels._novelId(novelId).episodes.$url()}>
          新しいエピソードを書く
        </NextLinkButton>
      </li>
    </ul>
  );
};
