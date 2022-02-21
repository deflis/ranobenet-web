import Head from 'next/head';
import { Container } from '~/components/atoms/common/Container';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { Heading } from '~/components/atoms/common/Heading';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { pagesPath } from '~/utils/$path';
import { useNovelFetcher } from '~/data/novels';
import { ChapterDtoForPublicTypeEnum, NovelDtoForPublic } from '~/ranobe-net-api';
import { NovelsApiCleint } from '~/utils/apiClient';

type Props = {
  novelId: number;
  novel: NovelDtoForPublic;
};

export interface Query extends ParsedUrlQuery {
  novelId: string;
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  const novelId = parseInt(context.params?.novelId ?? '', 10) || 1;
  const novel = await NovelsApiCleint.apiV1NovelsIdGet({ id: novelId });
  return {
    props: {
      novelId,
      novel,
    },
    revalidate: 60 * 60 * 10,
  };
};

const Novel: NextPage<Props> = ({ novelId, novel: prefetchedNovel }) => {
  const { novel } = useNovelFetcher(novelId, prefetchedNovel);

  return (
    <>
      <Head>
        <title>{novel?.title}</title>
      </Head>

      {novel && (
        <Container>
          <Heading>{novel.title}</Heading>
          {novel.chapters.map((chapter) => (
            <>
              {chapter.type === ChapterDtoForPublicTypeEnum.NUMBER_1 && <Heading>{chapter.title}</Heading>}
              {chapter.episodes.map((episode) => (
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

export default Novel;
