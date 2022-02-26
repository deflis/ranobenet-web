import { NextLinkButton } from '~/components/atoms/common/Button';
import AuthUser from '~/components/utils/AuthUser';
import { useIsLoggedIn } from '~/modules/utils/firebase/auth';
import { pageIndex, pageLogin } from '~/modules/utils/path';
import NextLink from 'next/link';

import styles from './GlobalHeader.module.css';

export const GlobalHeader = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <NextLink href={pageIndex()}>らのべねっと</NextLink>
        </div>
        <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
          {isLoggedIn && <AuthUser />}
          {!isLoggedIn && (
            <NextLinkButton href={pageLogin()} className={styles.signInButton}>
              Sign up
            </NextLinkButton>
          )}
        </div>
      </div>
    </header>
  );
};
