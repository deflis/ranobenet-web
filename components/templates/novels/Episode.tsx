import Head from 'next/head';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { Container, MiddleContainer } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import NovelRenderer from '~/components/atoms/novels/NovelRenderer';
import { EpisodeDtoForPublic } from '~/ranobe-net-api/@types';
import { globalTitle } from '~/modules/utils/constants';
import { NovelLines } from '~/modules/utils/parser';
import { pageNovelEpisode } from '~/modules/utils/path';
import { useAtomValue } from 'jotai';
import { fontAtom } from '~/modules/theme/font';
import clsx from 'clsx';

export const Episode: React.FC<{
  novelId: number;
  episode: EpisodeDtoForPublic;
  story: NovelLines;
  prevEpisode: EpisodeDtoForPublic | undefined;
  nextEpisode: EpisodeDtoForPublic | undefined;
}> = ({ novelId, episode, story, prevEpisode, nextEpisode }) => {
  const font = useAtomValue(fontAtom);
  return (
    <>
      <Head>
        <title>
          {episode.title} - {globalTitle}
        </title>
      </Head>

      <MiddleContainer>
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
        <NovelRenderer className={clsx(font)} story={story} />
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
      </MiddleContainer>
    </>
  );
};
