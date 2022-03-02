import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { UpdateEpisode } from '~/components/templates/edit/novels/episodes/UpdateEpisode';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';

export interface Query extends ParsedUrlQuery {
  novelId: string;
  episodeId: string;
}

const Page: NextPage = () => {
  const router = useRouter();
  const { novelId, episodeId } = router.query as Query;
  const novelIdNum = parseInt(novelId, 10) || 1;
  const episodeIdNum = parseInt(episodeId, 10) || 1;

  return (
    <GlobalContainer>
      <UpdateEpisode novelId={novelIdNum} episodeId={episodeIdNum} />
    </GlobalContainer>
  );
};

export default Page;
