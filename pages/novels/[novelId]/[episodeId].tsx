import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Loading } from '~/components/atoms/common/Loading';
import { Episode } from '~/components/templates/novels/Episode';
import { fetchNovel, fetchNovels, useNovelEpisodeFetcher } from '~/modules/data/novels';
import { NovelDtoForPublic } from '~/ranobe-net-api/@types';

type Props = {
  novelId: number;
  episodeId: number;
  novel: NovelDtoForPublic;
};

export interface Query extends ParsedUrlQuery {
  novelId: string;
  episodeId: string;
}

const getEpisodes = async (novelId: number): Promise<{ params: Query }[]> => {
  const novel = await fetchNovel(novelId);
  return novel.chapters.flatMap(({ episodes }) =>
    episodes.map(({ id: episodeId }) => ({
      params: {
        novelId: novelId.toString(),
        episodeId: episodeId.toString(),
      },
    }))
  );
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const novel = await fetchNovels(1);

  const paths: { params: Query }[] = [];

  for (const { id: novelId } of novel.items) {
    paths.push(...(await getEpisodes(novelId)));
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  const novelId = parseInt(context.params?.novelId ?? '', 10) || 1;
  const episodeId = parseInt(context.params?.episodeId ?? '', 10) || 1;
  const novel = await fetchNovel(novelId);
  return {
    props: {
      novelId,
      episodeId,
      novel,
    },
    revalidate: 60 * 60 * 10,
  };
};

const Page: NextPage<Props> = ({ novelId, episodeId, novel: prefetchedNovel }) => {
  const { loading, episode, prevEpisode, nextEpisode } = useNovelEpisodeFetcher(novelId, episodeId, prefetchedNovel);

  return (
    <>
      <Loading enable={loading} />
      {episode && <Episode novelId={novelId} episode={episode} prevEpisode={prevEpisode} nextEpisode={nextEpisode} />}
    </>
  );
};

export default Page;
