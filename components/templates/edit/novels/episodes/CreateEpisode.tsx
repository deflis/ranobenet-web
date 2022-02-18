import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { EpisodeDtoForMe } from '~/ranobe-net-api';
import { Heading } from '~/components/atoms/common/Heading';
import { Loading } from '~/components/atoms/common/Loading';
import { EpisodeEditor } from '~/components/organism/edit/novels/EpisodeEditor';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useCreateEpisode } from '~/data/edit/episodes';
import { globalTitle } from '~/utils/constants';
import { pageEditNovelEpisodeUpdate } from '~/utils/path/edit';

export const CreateEpisode: React.FC<{ novelId: number }> = ({ novelId }) => {
  const router = useRouter();
  const handleCreated = useCallback(
    (episodeInfo: EpisodeDtoForMe) => {
      router.push(pageEditNovelEpisodeUpdate(novelId, episodeInfo.id));
    },
    [router, novelId]
  );
  const { novel, loading, create, loggedOut, error } = useCreateEpisode(novelId, handleCreated);

  return (
    <>
      <Head>
        <title>新規エピソードの投稿 - {globalTitle}</title>
      </Head>
      <Loading enable={loading} />
      <Heading>新規エピソードの投稿</Heading>
      {loggedOut && <NeedLogin label='新規エピソードの投稿' />}
      {JSON.stringify(error)}
      {!loading && novel && <EpisodeEditor novel={novel} onClickOk={create} />}
    </>
  );
};
