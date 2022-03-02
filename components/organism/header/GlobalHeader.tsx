import { NextLinkButton } from '~/components/atoms/common/Button';
import AuthUser from '~/components/utils/AuthUser';
import { useIsLoggedIn } from '~/modules/utils/firebase/auth';
import { pageIndex, pageLogin } from '~/modules/utils/path';
import NextLink from 'next/link';

import styles from './GlobalHeader.module.css';
import { Toggle } from '~/components/atoms/common/Toggle';
import { useAtom } from 'jotai';
import { darkModeAtom } from '~/modules/theme/dark';
import { useCallback } from 'react';
import { HiMoon } from 'react-icons/hi';
import { IoMoon } from 'react-icons/io5';

export const GlobalHeader = () => {
  const isLoggedIn = useIsLoggedIn();
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const toggleDarkMode = useCallback(() => {
    setDarkMode((x) => !x);
  }, []);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <NextLink href={pageIndex()}>
            <a>らのべねっと</a>
          </NextLink>
        </div>
        <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
          <Toggle id='darkmode' checked={darkMode} onChange={toggleDarkMode}>
            <IoMoon />
          </Toggle>
          {isLoggedIn && <AuthUser />}
          {!isLoggedIn && (
            <NextLinkButton href={pageLogin()} className={styles.signInButton}>
              ログインする
            </NextLinkButton>
          )}
        </div>
      </div>
    </header>
  );
};
