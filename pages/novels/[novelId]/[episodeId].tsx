import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { Container } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import NovelRenderer from '~/components/atoms/novels/NovelRenderer';
import { useNovelEpisodeFetcher } from '~/data/novels';
import { NovelDtoForPublic } from '~/ranobe-net-api';
import { NovelsApiCleint } from '~/utils/apiClient';
import { parse } from '~/utils/parser';
import { pageNovelEpisode } from '~/utils/path';

type Props = {
  novelId: number;
  episodeId: number;
  novel: NovelDtoForPublic;
};

export interface Query extends ParsedUrlQuery {
  novelId: string;
  episodeId: string;
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  const novelId = parseInt(context.params?.novelId ?? '', 10) || 1;
  const episodeId = parseInt(context.params?.episodeId ?? '', 10) || 1;
  const novel = await NovelsApiCleint.apiV1NovelsIdGet({ id: novelId });
  return {
    props: {
      novelId,
      episodeId,
      novel,
    },
    revalidate: 60 * 60 * 10,
  };
};

const Episode: NextPage<Props> = ({ novelId, episodeId, novel: prefetchedNovel }) => {
  const { episode, prevEpisode, nextEpisode } = useNovelEpisodeFetcher(novelId, episodeId, prefetchedNovel);

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

export default Episode;
