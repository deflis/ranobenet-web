import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';
import { InnerContainer } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import { Loading } from '~/components/atoms/common/Loading';
import { NovelData, NovelEditor } from '~/components/organism/edit/novels/NovelEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useUpdateNovel } from '~/data/edit/novels';
import { globalTitle } from '~/utils/constants';

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
      </InnerContainer>
    </>
  );
};
