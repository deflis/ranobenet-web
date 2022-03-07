import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient } from 'react-query';
import { Loading } from '~/components/atoms/common/Loading';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';
import { Episode } from '~/components/templates/novels/Episode';
import { fetchNovel, fetchNovels, prefetchNovel, useNovelEpisodeFetcher } from '~/modules/data/novels';
import { PropsDehydratedState } from '~/pages/_app';

type Props = {
  novelId: number;
  episodeId: number;
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

export const getStaticProps: GetStaticProps<Props & PropsDehydratedState, Query> = async (context) => {
  const novelId = parseInt(context.params?.novelId ?? '', 10) || 1;
  const episodeId = parseInt(context.params?.episodeId ?? '', 10) || 1;

  return {
    props: {
      novelId,
      episodeId,
      dehydratedState: dehydrate(await prefetchNovel(new QueryClient(), novelId)),
    },
    revalidate: 60 * 60 * 10,
  };
};

const Page: NextPage<Props> = ({ novelId, episodeId }) => {
  const { loading, episode } = useNovelEpisodeFetcher(novelId, episodeId);

  return (
    <>
      <Loading enable={loading} />
      {episode && (
        <Episode
          episode={episode}
        />
      )}
    </>
  );
};

export default Page;
