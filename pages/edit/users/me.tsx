import type { NextPage } from 'next';
import { EditUsersMe } from '~/components/templates/edit/EditUsersMe';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';

const Page: NextPage = () => {
  return (
    <GlobalContainer>
      <EditUsersMe />
    </GlobalContainer>
  );
};

export default Page;
