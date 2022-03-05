import NextLink from 'next/link';

import styles from './GlobalFooter.module.css';
import { pagesPath } from '~/modules/utils/$path';

export const GlobalFooter = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.terms}>
          <NextLink href={pagesPath.terms.$url()}>
            <a>利用規約</a>
          </NextLink>
        </div>
        <div className={styles.terms}>
          <NextLink href={pagesPath.terms.guideline.$url()}>
            <a>投稿ガイドライン</a>
          </NextLink>
        </div>
        <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'></div>
      </div>
    </footer>
  );
};
