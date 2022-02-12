import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { UpdateNovel } from '~/components/templates/edit/novels/UpdateNovel';

export interface Query extends ParsedUrlQuery {
  novelId: string;
}

const Page: NextPage = () => {
  const router = useRouter();
  const { novelId } = router.query as Query;
  const novelIdNum = parseInt(novelId, 10) || 1;

  return <UpdateNovel novelId={novelIdNum} />;
};

export default Page;
