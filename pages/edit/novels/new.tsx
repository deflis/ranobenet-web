import type { NextPage } from 'next';
import { CreateNovel } from '~/components/templates/edit/novels/CreateNovel';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';

const Page: NextPage = () => {
  return (
    <GlobalContainer>
      <CreateNovel />
    </GlobalContainer>
  );
};

export default Page;
