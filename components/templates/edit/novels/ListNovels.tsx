import Head from 'next/head';
import Link from 'next/link';
import { pagesPath } from '~/utils/$path';
import { Container } from '~/components/atoms/common/Container';
import { pageNovels } from '~/utils/path';
import { useNovelList } from '~/data/edit/novels';
import { Loading } from '~/components/atoms/common/Loading';

export const ListNovels: React.FC = () => {
  const { novels, loading } = useNovelList();
  return (
    <>
      <Head>
        <title>小説一覧</title>
      </Head>

      <Container>
        <Loading enable={loading} />
        {novels && (
          <>
            <p>小説 全{novels.totalCount}件</p>

            <ul>
              {novels.items.map((novel) => (
                <li key={novel.id}>
                  <Link href={pagesPath.edit.novels._novelId(novel.id).$url()}>{novel.title}</Link>
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
