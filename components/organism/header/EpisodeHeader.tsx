import { NextLinkButton } from '~/components/atoms/common/Button';
import AuthUser from '~/components/utils/AuthUser';
import { useIsLoggedIn } from '~/modules/utils/firebase/auth';
import { pageIndex, pageLogin, pageNovelDetail } from '~/modules/utils/path';
import NextLink from 'next/link';

import styles from './EpisodeHeader.module.css';
import { Toggle } from '~/components/atoms/common/Toggle';
import { useAtom } from 'jotai';
import { darkModeAtom } from '~/modules/theme/dark';
import { useCallback } from 'react';
import { HiMoon } from 'react-icons/hi';
import { IoClose, IoMoon } from 'react-icons/io5';
import { FaBars } from 'react-icons/fa';
import { NovelEpisode } from '~/modules/data/novels';
import Link from 'next/link';

export const EpisodeHeader: React.FC<{
  episode: NovelEpisode;
}> = ({ episode }) => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.closeButton}>
        <Link href={pageNovelDetail(episode.novel.id)}>
          <a>
            <IoClose />
          </a>
        </Link>
      </div>
      <div className={styles.title}>
        <h2>{episode.novel.title}</h2>
        <h3>{episode.title}</h3>
      </div>
      <div className={styles.hamburger}>
        <button>
          <FaBars />
        </button>
      </div>
    </header>
  );
};
