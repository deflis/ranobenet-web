import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { EpisodeDtoForMe, EpisodeDtoForSave } from '~/ranobe-net-api/@types';
import { Heading } from '~/components/atoms/common/Heading';
import { Loading } from '~/components/atoms/common/Loading';
import { EpisodeEditor } from '~/components/organism/edit/novels/EpisodeEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useCreateEpisode } from '~/modules/data/edit/episodes';
import { globalTitle } from '~/modules/utils/constants';
import { pageEditNovelEpisodeUpdate } from '~/modules/utils/path/edit';
import { toast } from 'react-toastify';

export const CreateEpisode: React.FC<{ novelId: number }> = ({ novelId }) => {
  const router = useRouter();
  const handleCreated = useCallback(
    (episodeInfo: EpisodeDtoForMe) => {
      router.push(pageEditNovelEpisodeUpdate(novelId, episodeInfo.id));
    },
    [router, novelId]
  );
  const { novel, loading, create, loggedOut, error } = useCreateEpisode(novelId, handleCreated);

  const handleClickOk = useCallback(
    (episodeInfo: EpisodeDtoForSave) => {
      toast.promise(create(episodeInfo), {
        pending: '更新中',
        success: '更新しました',
        error: '失敗しました',
      });
    },
    [create]
  );

  return (
    <>
      <Head>
        <title>新規エピソードの投稿 - {globalTitle}</title>
      </Head>
      <Loading enable={loading} />
      <Heading>新規エピソードの投稿</Heading>
      {loggedOut && <NeedLogin label='新規エピソードの投稿' />}
      {JSON.stringify(error)}
      {!loading && novel && <EpisodeEditor novel={novel} onSuccess={handleClickOk} />}
    </>
  );
};
