import Head from 'next/head';
import { useCallback } from 'react';
import { EpisodeDtoForMe } from '~/ranobe-net-api';
import { Heading } from '~/components/atoms/common/Heading';
import { Loading } from '~/components/atoms/common/Loading';
import { EpisodeData, EpisodeEditor } from '~/components/organism/edit/novels/EpisodeEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useUpdateEpisode } from '~/data/edit/episodes';
import { globalTitle } from '~/utils/constants';

export const UpdateEpisode: React.FC<{ novelId: number; episodeId: number }> = ({ novelId, episodeId }) => {
  const { novel, episode, loading, update, loggedOut, error } = useUpdateEpisode(novelId, episodeId);

  return (
    <>
      <Head>
        <title>エピソードの編集 - {globalTitle}</title>
      </Head>
      <Loading enable={loading} />
      <Heading>エピソードの編集</Heading>
      {loggedOut && <NeedLogin label='エピソードの編集' />}
      {JSON.stringify(error)}
      {!loading && novel && episode && <EpisodeEditor novel={novel!} defaultValues={episode} onClickOk={update} />}
    </>
  );
};
