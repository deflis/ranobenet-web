import clsx from 'clsx';
import React from 'react';
import styles from './Heading.module.css';

export const Heading: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h1 className={clsx(styles.heading, className)}>{children}</h1>
);
