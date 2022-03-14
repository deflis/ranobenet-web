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

      <div className='flex h-screen w-screen flex-col'>
        <div className='w-full'>
          <EpisodeHeader episode={episode} />
        </div>
        <div className='h-full w-full overflow-auto bg-white text-black dark:bg-black dark:text-white' ref={ref}>
          {prevEpisode && (
            <div className='mb-2 w-full text-center text-sm'>
              <Link href={pageNovelEpisode(novel.id, prevEpisode.id)}>
                <a className='block w-full bg-slate-200 p-2 text-white hover:bg-slate-300'>
                  <span className='text-gray-500'>前のエピソード</span>
                  <span className='tracking-tight text-gray-400	'>――</span>{' '}
                  <span className='text-black'>{prevEpisode.title}</span>
                </a>
              </Link>
            </div>
          )}
          <MiddleContainer>
            <Heading className={clsx('text-center', 'my-10')}>{episode.title}</Heading>
            <NovelRenderer className={clsx(font, 'my-10')} story={story} />
          </MiddleContainer>
          {nextEpisode && (
            <div className='mt-2 w-full text-center text-sm'>
              <Link href={pageNovelEpisode(novel.id, nextEpisode.id)}>
                <a className='block w-full bg-slate-200 p-2 text-white hover:bg-slate-300'>
                  <span className='text-gray-500'>次のエピソード</span>
                  <span className='tracking-tight text-gray-400	'>――</span>{' '}
                  <span className='text-black'>{nextEpisode.title}</span>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
