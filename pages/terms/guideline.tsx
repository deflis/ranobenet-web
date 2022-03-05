import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';
import { globalTitle } from '~/modules/utils/constants';
import Guideline from '~/components/texts/guideline.mdx';
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
        <title>投稿ガイドライン - {globalTitle}</title>
      </Head>
      <TextRenderer>
        <Guideline />
      </TextRenderer>
    </GlobalContainer>
  );
};

export default Index;
