import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';
import { globalTitle } from '~/modules/utils/constants';
import Term from '~/components/texts/term.mdx';
import { TextRenderer } from '~/components/utils/TextRenderer';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

const Index: NextPage = () => {
  return (
    <GlobalContainer>
      <Head>
        <title>利用規約 - {globalTitle}</title>
      </Head>
      <TextRenderer>
        <Term />
      </TextRenderer>
    </GlobalContainer>
  );
};

export default Index;
