import Head from 'next/head';
import { useMemo } from 'react';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { Container } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import NovelRenderer from '~/components/atoms/novels/NovelRenderer';
import { EpisodeDtoForPublic } from '~/ranobe-net-api/@types';
import { globalTitle } from '~/utils/constants';
import { parse } from '~/utils/parser';
import { pageNovelEpisode } from '~/utils/path';

export const Episode: React.FC<{
  novelId: number;
  episode: EpisodeDtoForPublic;
  prevEpisode: EpisodeDtoForPublic | undefined;
  nextEpisode: EpisodeDtoForPublic | undefined;
}> = ({ novelId, episode, prevEpisode, nextEpisode }) => {
  const story = useMemo(() => parse(episode.story), [episode.story]);

  return (
    <>
      <Head>
        <title>
          {episode.title} - {globalTitle}
        </title>
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
        <Heading>{episode.title}</Heading>
        <NovelRenderer story={story} />
      </Container>
    </>
  );
};
