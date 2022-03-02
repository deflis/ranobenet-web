import Head from 'next/head';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Heading } from '~/components/atoms/common/Heading';
import { Loading } from '~/components/atoms/common/Loading';
import { EpisodeEditor } from '~/components/organism/edit/novels/EpisodeEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useUpdateEpisode } from '~/modules/data/edit/episodes';
import { globalTitle } from '~/modules/utils/constants';
import { EpisodeDtoForSave } from '~/ranobe-net-api/@types';

export const UpdateEpisode: React.FC<{ novelId: number; episodeId: number }> = ({ novelId, episodeId }) => {
  const { novel, episode, loading, update, loggedOut, error } = useUpdateEpisode(novelId, episodeId);

  const handleClickOk = useCallback(
    (episodeInfo: EpisodeDtoForSave) => {
      toast.promise(update(episodeInfo), {
        pending: '更新中',
        success: '更新しました',
        error: '失敗しました',
      });
    },
    [update]
  );
  return (
    <>
      <Head>
        <title>エピソードの編集 - {globalTitle}</title>
      </Head>
      <Loading enable={loading} />
      <Heading>エピソードの編集</Heading>
      {loggedOut && <NeedLogin label='エピソードの編集' />}
      {JSON.stringify(error)}
      {!loading && novel && episode && (
        <EpisodeEditor novel={novel!} defaultValues={episode} onSuccess={handleClickOk} />
      )}
    </>
  );
};
