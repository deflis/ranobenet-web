import React from 'react';
import styles from './Loading.module.css';
import clsx from 'clsx';

type LoadingProps = {
  enable: boolean;
  label?: React.ReactNode;
  children?: React.ReactNode;
};

export const Loading: React.VFC<LoadingProps> = ({ children, label, enable }) => (
  <>
    {
      <div className={clsx(styles.container, enable && styles.enable)}>
        <div className={styles.loader}></div>
        {label && <h2 className={styles.label}>{label}</h2>}
        {children && <p className={styles.children}>{children}</p>}
      </div>
    }
  </>
);
