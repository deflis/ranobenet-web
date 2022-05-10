import { Button, NextLinkButton } from '~/components/atoms/common/Button';
import { Heading } from '~/components/atoms/common/Heading';
import { useChapters } from '~/modules/data/edit/chapters';
import { useDeleteEpisode } from '~/modules/data/edit/episodes';
import { pagesPath } from '~/modules/utils/$path';

export const EpisodeListEditor: React.FC<{ novelId: number }> = ({ novelId }) => {
  const { chapters } = useChapters(novelId);
  const { delete: deleteFunc } = useDeleteEpisode(novelId);
  return (
    <ul>
      {chapters?.chapters.map((chapter) => (
        <>
          {chapter.type === 'chapter' && <Heading>{chapter.title}</Heading>}
          {chapter.episodes.map((episode) => (
            <li key={episode.id}>
              {episode.title}
              <NextLinkButton href={pagesPath.edit.novels._novelId(novelId).episodes._episodeId(episode.id).$url()}>
                編集
              </NextLinkButton>
              <Button onClick={() => deleteFunc(episode.id)}>削除</Button>
            </li>
          ))}
        </>
      ))}
      <li>
        <NextLinkButton href={pagesPath.edit.novels._novelId(novelId).episodes.$url()}>
          新しいエピソードを書く
        </NextLinkButton>
      </li>
    </ul>
  );
};
