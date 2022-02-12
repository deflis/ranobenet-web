import Head from 'next/head';
import { Container } from '~/components/atoms/common/Container';
import type { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { Heading } from '~/components/atoms/common/Heading';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { pagesPath } from '~/utils/$path';
import { useNovelFetcher } from '~/data/novels';
import { ChapterDtoForPublicTypeEnum } from '~/api';

export interface Query extends ParsedUrlQuery {
  novelId: string;
}

const Novel: React.FC<{ novelId: number }> = ({ novelId }) => {
  const { novel } = useNovelFetcher(novelId);

  return (
    <>
      <Head>
        <title>{novel?.title}</title>
      </Head>

      {novel && (
        <Container>
          <Heading>{novel.title}</Heading>
          {novel.chapters!.map((chapter) => (
            <>
              {chapter.type === ChapterDtoForPublicTypeEnum.NUMBER_1 && <Heading>{chapter.title}</Heading>}
              {chapter.episodes!.map((episode) => (
                <p key={episode.id}>
                  <NextLinkButton href={pagesPath.novels._novelId(novelId)._episodeId(episode.id!).$url()}>
                    {episode.title}
                  </NextLinkButton>
                </p>
              ))}
            </>
          ))}
        </Container>
      )}
    </>
  );
};

const Page: NextPage = () => {
  const router = useRouter();
  const { novelId } = router.query as Query;
  const novelIdNum = parseInt(novelId, 10) || 1;

  // SWR hooks inside the `SWRConfig` boundary will use those values.
  return (
    <SWRConfig>
      <Novel novelId={novelIdNum} />
    </SWRConfig>
  );
};

export default Page;
