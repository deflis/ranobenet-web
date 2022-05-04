import { NextLinkButton } from '~/components/atoms/common/Button';
import AuthUser from '~/components/utils/AuthUser';
import { useIsLoggedIn } from '~/modules/utils/firebase/auth';
import { pageIndex, pageLogin } from '~/modules/utils/path';
import NextLink from 'next/link';

import styles from './GlobalHeader.module.css';
import { ToggleStandalone } from '~/components/atoms/common/Toggle';
import { useCallback } from 'react';
import { IoMoon } from 'react-icons/io5';
import { useTheme } from 'next-themes';

export const GlobalHeader = () => {
  const isLoggedIn = useIsLoggedIn();
  const { theme, setTheme } = useTheme();
  const toggleDarkMode = useCallback(
    (value: boolean) => {
      setTheme(value ? 'dark' : 'light');
    },
    [setTheme]
  );

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        <NextLink href={pageIndex()}>
          <a>らのべねっと</a>
        </NextLink>
      </div>
      <div className={styles.switch}>
        <ToggleStandalone id='darkmode' value={theme === 'dark'} onChange={toggleDarkMode}>
          <IoMoon />
        </ToggleStandalone>
      </div>
      <div className={styles.user}>
        {isLoggedIn && <AuthUser />}
        {!isLoggedIn && <NextLinkButton href={pageLogin()}>ログインする</NextLinkButton>}
      </div>
    </header>
  );
};
