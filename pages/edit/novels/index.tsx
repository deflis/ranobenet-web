import type { NextPage } from 'next';
import { ListNovels } from '~/components/templates/edit/novels/ListNovels';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';

const Page: NextPage = () => {
  return (
    <GlobalContainer>
      <ListNovels />
    </GlobalContainer>
  );
};

export default Page;
