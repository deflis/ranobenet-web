import type { GetStaticProps, NextPage } from 'next';
import { Home } from '~/components/templates/home/Home';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

const Index: NextPage = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default Index;
