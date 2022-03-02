import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { CreateEpisode } from '~/components/templates/edit/novels/episodes/CreateEpisode';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';

export interface Query extends ParsedUrlQuery {
  novelId: string;
}

const Page: NextPage = () => {
  const router = useRouter();
  const { novelId } = router.query as Query;
  const novelIdNum = parseInt(novelId, 10) || 1;

  return (
    <GlobalContainer>
      <CreateEpisode novelId={novelIdNum} />
    </GlobalContainer>
  );
};

export default Page;
