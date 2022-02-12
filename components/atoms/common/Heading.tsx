import React from 'react';
import styles from './Heading.module.css';

export const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className={styles.heading}>{children}</h1>
);
