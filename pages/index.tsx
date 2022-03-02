import type { GetStaticProps, NextPage } from 'next';
import { Head } from 'next/document';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';
import { Home } from '~/components/templates/home/Home';
import { globalTitle } from '~/modules/utils/constants';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

const Index: NextPage = () => {
  return (
    <GlobalContainer>
      <Head>
        <title>{globalTitle}</title>
      </Head>
      <Home />
    </GlobalContainer>
  );
};

export default Index;
