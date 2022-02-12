import React from 'react';
import styles from './Button.module.css';
import NextLink, { LinkProps } from 'next/link';
import clsx from 'clsx';

export const Button: React.VFC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button className={clsx(styles.button, className)} {...props}>
    {children}
  </button>
);

export const SubmitButton: React.VFC<Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & { children: string }> =
  ({ className, children, ...props }) => (
    <input className={clsx(styles.button, className)} type='submit' value={children} {...props} />
  );

export const LinkButton: React.VFC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean }> = ({
  children,
  className,
  ...props
}) => (
  <a className={clsx(styles.button, className)} {...props}>
    {children}
  </a>
);

export const NextLinkButton: React.FC<LinkProps & { disabled?: boolean; className?: string }> = ({
  children,
  className,
  ...props
}) => (
  <NextLink {...props}>
    <a className={clsx(styles.button, className)}>{children}</a>
  </NextLink>
);
