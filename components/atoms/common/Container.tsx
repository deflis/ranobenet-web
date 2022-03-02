import React from 'react';
import styles from './Container.module.css';

type ContainerProps = {
  children: React.ReactNode;
};

export const Container: React.VFC<ContainerProps> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export const InnerContainer: React.VFC<ContainerProps> = ({ children }) => (
  <div className={styles.innerContainer}>{children}</div>
);

export const MiddleContainer: React.VFC<ContainerProps> = ({ children }) => (
  <div className={styles.middleContainer}>{children}</div>
);
