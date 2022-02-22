import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Loading } from '~/components/atoms/common/Loading';
import { Episode } from '~/components/templates/novels/Episode';
import { useNovelEpisodeFetcher } from '~/data/novels';
import { ApiV1NovelsGetOrderEnum, NovelDtoForPublic } from '~/ranobe-net-api';
import { NovelsApiCleint } from '~/utils/apiClient';

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
  const novel = await NovelsApiCleint.apiV1NovelsIdGet({ id: novelId });
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
  const novel = await NovelsApiCleint.apiV1NovelsGet({ order: ApiV1NovelsGetOrderEnum.Id, descending: true });

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
