import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { Container } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import NovelRenderer from '~/components/atoms/novels/NovelRenderer';
import { useNovelEpisodeFetcher } from '~/data/novels';
import { parse } from '~/utils/parser';
import { pageNovelEpisode } from '~/utils/path';

export interface Query extends ParsedUrlQuery {
  novelId: string;
  episodeId: string;
}

const Episode: React.FC<{ novelId: number; episodeId: number }> = ({ novelId, episodeId }) => {
  const { episode, prevEpisode, nextEpisode } = useNovelEpisodeFetcher(novelId, episodeId);

  const story = useMemo(() => (episode ? parse(episode.story) : undefined), [episode]);

  return (
    <>
      <Head>
        <title>{episode?.title}</title>
      </Head>

      <Container>
        {(prevEpisode || nextEpisode) && (
          <p>
            {prevEpisode && (
              <NextLinkButton href={pageNovelEpisode(novelId, prevEpisode.id!)}>
                {'<'} {prevEpisode.title}
              </NextLinkButton>
            )}
            {nextEpisode && (
              <NextLinkButton href={pageNovelEpisode(novelId, nextEpisode.id!)}>
                {nextEpisode.title} {'>'}
              </NextLinkButton>
            )}
          </p>
        )}
        {episode && story && (
          <>
            <Heading>{episode.title}</Heading>
            <NovelRenderer story={story} />
          </>
        )}
      </Container>
    </>
  );
};
const Page: NextPage = () => {
  const { query } = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const novelId = parseInt((query as Query).novelId, 10);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const episodeId = parseInt((query as Query).episodeId, 10);

  // SWR hooks inside the `SWRConfig` boundary will use those values.
  return <Episode novelId={novelId} episodeId={episodeId} />;
};

export default Page;
