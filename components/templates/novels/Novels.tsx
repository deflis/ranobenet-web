import Head from 'next/head';
import { Container } from '~/components/atoms/common/Container';
import { NovelDtoForPublicListingPagedList } from '~/ranobe-net-api/@types';
import { pageNovels } from '~/modules/utils/path';
import { globalTitle } from '~/modules/utils/constants';
import { NovelList } from '~/components/organism/novels/NovelList';
import { Pagination } from '~/components/atoms/common/Pagination';

export const Novels: React.FC<{ novels: NovelDtoForPublicListingPagedList }> = ({ novels }) => {
  return (
    <>
      <Head>
        <title>小説一覧 - {globalTitle}</title>
      </Head>

      <Container>
        <p>小説 全{novels.totalCount}件</p>

        <NovelList novels={novels.items} />
        <Pagination pagedList={novels} createHref={pageNovels} />
      </Container>
    </>
  );
};
