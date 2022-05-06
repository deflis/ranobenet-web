import { IoBookmarkOutline } from 'react-icons/io5';
import { pageNovelEpisode } from '~/modules/utils/path';
import { ChapterDtoForPublic } from '~/ranobe-net-api/@types';
import NextLink from 'next/link';
import styles from './EpisodeList.module.css';

export const EpisodeList: React.FC<{ chapters: ChapterDtoForPublic[]; novelId: number }> = ({ chapters, novelId }) =>
  chapters.some((x) => x.episodes.length !== 0) ? (
    <div className={styles.container}>
      {chapters
        .filter((x) => x.episodes.length !== 0)
        .map((chapter) => (
          <>
            {chapter.type === 'chapter' && <header className={styles.chapter}>{chapter.title}</header>}
            {chapter.episodes.map((episode) => (
              <NextLink href={pageNovelEpisode(novelId, episode.id)} key={episode.id}>
                <a className={styles.episode}>
                  <IoBookmarkOutline className={styles.icon} />
                  <div>{episode.title}</div>
                </a>
              </NextLink>
            ))}
          </>
        ))}
    </div>
  ) : null;
