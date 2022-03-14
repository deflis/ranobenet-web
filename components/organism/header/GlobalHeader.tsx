import { NextLinkButton } from '~/components/atoms/common/Button';
import AuthUser from '~/components/utils/AuthUser';
import { useIsLoggedIn } from '~/modules/utils/firebase/auth';
import { pageIndex, pageLogin } from '~/modules/utils/path';
import NextLink from 'next/link';

import styles from './GlobalHeader.module.css';
import { Toggle, ToggleStandalone } from '~/components/atoms/common/Toggle';
import { useAtom } from 'jotai';
import { darkModeAtom } from '~/modules/theme/dark';
import { useCallback } from 'react';
import { IoMoon } from 'react-icons/io5';
import { useTheme } from 'next-themes';

export const GlobalHeader = () => {
  const isLoggedIn = useIsLoggedIn();
  const { theme, setTheme } = useTheme();
  const toggleDarkMode = useCallback((value: boolean) => {
    setTheme(value ? 'dark' : 'light');
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
          <ToggleStandalone id='darkmode' value={theme === 'dark'} onChange={toggleDarkMode}>
            <IoMoon />
          </ToggleStandalone>
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
