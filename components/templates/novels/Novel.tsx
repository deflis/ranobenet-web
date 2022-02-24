import Head from 'next/head';
import NextLink from 'next/link';
import { Container, InnerContainer } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { pagesPath } from '~/utils/$path';
import { NovelDtoForPublic } from '~/ranobe-net-api/@types';
import { globalTitle } from '~/utils/constants';
import { pageUserDetail } from '~/utils/path';

export const Novel: React.FC<{ novel: NovelDtoForPublic }> = ({ novel }) => {
  return (
    <>
      <Head>
        <title>
          {novel.title} - {globalTitle}
        </title>
      </Head>

      {novel && (
        <Container>
          <Heading>{novel.title}</Heading>
          <InnerContainer>
            <p>
              作者: <NextLink href={pageUserDetail(novel.userId)}>{novel.author}</NextLink>
            </p>
            <p>{novel.description}</p>
          </InnerContainer>
          {novel.chapters.map((chapter) => (
            <>
              {chapter.type === 'Chapter' && <Heading>{chapter.title}</Heading>}
              {chapter.episodes.map((episode) => (
                <p key={episode.id}>
                  <NextLinkButton href={pagesPath.novels._novelId(novel.id)._episodeId(episode.id).$url()}>
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
