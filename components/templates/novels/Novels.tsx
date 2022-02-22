import Head from 'next/head';
import Link from 'next/link';
import { pagesPath } from '~/utils/$path';
import { Container } from '~/components/atoms/common/Container';
import { NovelDtoForPublicListingPagedList } from '~/ranobe-net-api/@types';
import { pageNovels } from '~/utils/path';

export const Novels: React.FC<{ novels: NovelDtoForPublicListingPagedList }> = ({ novels }) => {
  return (
    <>
      <Head>
        <title>小説一覧</title>
      </Head>

      <Container>
        {novels && (
          <>
            <p>小説 全{novels.totalCount}件</p>

            <ul>
              {novels.items.map((novel) => (
                <li key={novel.id}>
                  <Link href={pagesPath.novels._novelId(novel.id).$url()}>{novel.title}</Link>
                </li>
              ))}
            </ul>
            <p>
              {novels.hasPrevious && <Link href={pageNovels(novels.currentPage - 1)}>{'<'}</Link>}
              {novels.currentPage}
              {novels.hasNext && <Link href={pageNovels(novels.currentPage + 1)}>{'>'}</Link>}
            </p>
          </>
        )}
      </Container>
    </>
  );
};
