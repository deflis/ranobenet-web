import Head from 'next/head';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { MiddleContainer } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import NovelRenderer from '~/components/atoms/novels/NovelRenderer';
import { globalTitle } from '~/modules/utils/constants';
import { pageNovelEpisode } from '~/modules/utils/path';
import { useAtomValue } from 'jotai';
import { fontAtom } from '~/modules/theme/font';
import clsx from 'clsx';
import { EpisodeHeader } from '~/components/organism/header/EpisodeHeader';
import { NovelEpisode } from '~/modules/data/novels';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './Episode.module.css';

export const Episode: React.FC<{
  episode: NovelEpisode;
}> = ({ episode }) => {
  const font = useAtomValue(fontAtom);
  const { prevEpisode, nextEpisode, novel, story, title } = episode;

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [episode]);

  return (
    <>
      <Head>
        <title>
          {title} - {globalTitle}
        </title>
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <EpisodeHeader episode={episode} />
        </div>
        <div className={styles.contents} ref={ref}>
          {prevEpisode && (
            <div className={styles.episodeNavigator}>
              <Link href={pageNovelEpisode(novel.id, prevEpisode.id)}>
                <a>
                  <span className={styles.label}>前のエピソード</span>
                  <span className={styles.dash}>――</span> <span className={styles.title}>{prevEpisode.title}</span>
                </a>
              </Link>
            </div>
          )}
          <MiddleContainer>
            <Heading className={styles.novelTitle}>{episode.title}</Heading>
            <NovelRenderer className={clsx(font, styles.novel)} story={story} />
          </MiddleContainer>
          {nextEpisode && (
            <div className={styles.episodeNavigator}>
              <Link href={pageNovelEpisode(novel.id, nextEpisode.id)}>
                <a>
                  <span className={styles.label}>次のエピソード</span>
                  <span className={styles.dash}>――</span> <span className={styles.title}>{nextEpisode.title}</span>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
