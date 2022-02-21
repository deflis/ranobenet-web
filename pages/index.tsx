import { useUserContext } from '~/utils/firebase/auth';
import type { NextPage } from 'next';
import { Home } from '~/components/templates/home/Home';

const Index: NextPage = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default Index;
