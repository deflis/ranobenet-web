import Head from 'next/head';
import NextLink from 'next/link';
import { Container, InnerContainer, MiddleContainer } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { pagesPath } from '~/modules/utils/$path';
import { NovelDtoForPublic } from '~/ranobe-net-api/@types';
import { globalTitle } from '~/modules/utils/constants';
import { pageNovelEpisode, pageUserDetail } from '~/modules/utils/path';
import { IoBookmarkOutline } from 'react-icons/io5';
import { EpisodeList } from '~/components/organism/novels/EpisodeList';

export const Novel: React.FC<{ novel: NovelDtoForPublic }> = ({ novel }) => {
  return (
    <>
      <Head>
        <title>
          {novel.title} - {globalTitle}
        </title>
      </Head>

      {novel && (
        <MiddleContainer>
          <Heading>{novel.title}</Heading>
          <InnerContainer>
            <p>
              作者: <NextLink href={pageUserDetail(novel.userId)}>{novel.author}</NextLink>
            </p>
            <p>{novel.description}</p>
          </InnerContainer>
          <EpisodeList novelId={novel.id} chapters={novel.chapters} />
        </MiddleContainer>
      )}
    </>
  );
};
