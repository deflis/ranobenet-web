import Head from 'next/head';
import { Container } from '~/components/atoms/common/Container';
import { Heading } from '~/components/atoms/common/Heading';
import { NextLinkButton } from '~/components/atoms/common/Button';
import { pagesPath } from '~/utils/$path';
import { ChapterDtoForPublicTypeEnum, NovelDtoForPublic } from '~/ranobe-net-api';

export const Novel: React.FC<{ novel: NovelDtoForPublic }> = ({ novel }) => {
  return (
    <>
      <Head>
        <title>{novel.title}</title>
      </Head>

      {novel && (
        <Container>
          <Heading>{novel.title}</Heading>
          {novel.chapters.map((chapter) => (
            <>
              {chapter.type === ChapterDtoForPublicTypeEnum.NUMBER_1 && <Heading>{chapter.title}</Heading>}
              {chapter.episodes.map((episode) => (
                <p key={episode.id}>
                  <NextLinkButton href={pagesPath.novels._novelId(novel.id)._episodeId(episode.id!).$url()}>
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
