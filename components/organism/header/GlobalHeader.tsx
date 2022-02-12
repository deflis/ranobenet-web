import { NextLinkButton } from '~/components/atoms/common/Button';
import AuthUser from '~/components/utils/AuthUser';
import { useUserContext } from '~/utils/firebase/auth';
import { pageLogin } from '~/utils/path';

import styles from './GlobalHeader.module.css';

export const GlobalHeader = () => {
  const user = useUserContext();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>らのべねっと</div>
        <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
          {user && <AuthUser firebaseUser={user} />}
          {!user && (
            <NextLinkButton href={pageLogin()} className={styles.signInButton}>
              Sign up
            </NextLinkButton>
          )}
        </div>
      </div>
    </header>
  );
};
