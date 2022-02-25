import Head from 'next/head';
import { useCallback, useMemo } from 'react';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { InnerContainer } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import { Loading } from '~/components/atoms/common/Loading';
import { NovelData, NovelEditor } from '~/components/organism/edit/novels/NovelEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useUpdateNovel } from '~/modules/data/edit/novels';
import { useNovelFetcher } from '~/modules/data/novels';
import { pagesPath } from '~/modules/utils/$path';
import { globalTitle } from '~/modules/utils/constants';

export const UpdateNovel: React.FC<{ novelId: number }> = ({ novelId }) => {
  const { novel, loading, update, loggedOut } = useUpdateNovel(novelId);

  const handleClickOk = useCallback(
    ({ title, description, useAuthorName, author }: NovelData) => {
      update({
        title,
        description,
        author: useAuthorName ? author : undefined,
      });
    },
    [update]
  );

  const values = useMemo<NovelData | undefined>(
    () =>
      novel
        ? {
            title: novel.title!,
            description: novel.description!,
            useAuthorName: !!novel.author,
            author: novel.author ?? '',
          }
        : undefined,
    [novel, novel?.title, novel?.description, novel?.author]
  );

  return (
    <>
      <Head>
        <title>
          小説の編集 - {novel?.title} - {globalTitle}
        </title>
      </Head>
      <Loading enable={loading} />
      <InnerContainer>
        <Heading>小説情報の編集</Heading>
        {loggedOut && <NeedLogin label='小説情報の編集' />}
        {values && <NovelEditor defaultValues={values} onClickOk={handleClickOk} />}
        {!loggedOut && <Episodes novelId={novelId} />}
      </InnerContainer>
    </>
  );
};

// TODO: あとでちゃんとorganismコンポーネントとして書く
const Episodes: React.FC<{ novelId: number }> = ({ novelId }) => {
  // TODO: NovelDtoForMe で返す
  const { novel } = useNovelFetcher(novelId);
  return (
    <ul>
      {novel?.chapters.map((chapter) => (
        <>
          {chapter.type === 'Chapter' && <Heading>{chapter.title}</Heading>}
          {chapter.episodes.map((episode) => (
            <li key={episode.id}>
              <NextLinkButton href={pagesPath.edit.novels._novelId(novel.id).episodes._episodeId(episode.id).$url()}>
                {episode.title} を編集
              </NextLinkButton>
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
