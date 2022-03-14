import React from 'react';
import styles from './Button.module.css';
import NextLink, { LinkProps } from 'next/link';
import clsx from 'clsx';

type ButtonColorType = 'primary';
type ButtonColorProps = {
  color?: ButtonColorType;
};
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonColorProps;

export const Button: React.VFC<ButtonProps> = ({ children, className, color = 'primary', ...props }) => (
  <button className={clsx(styles.button, className, styles[color])} {...props}>
    {children}
  </button>
);

type SubmitButtonProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> &
  ButtonColorProps & {
    children: string;
  };
export const SubmitButton: React.VFC<SubmitButtonProps> = ({ className, children, color = 'primary', ...props }) => (
  <input className={clsx(styles.button, className, styles[color])} type='submit' value={children} {...props} />
);

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonColorProps;

export const LinkButton: React.VFC<LinkButtonProps> = ({ children, className, color = 'primary', ...props }) => (
  <a className={clsx(styles.button, className, styles[color])} {...props}>
    {children}
  </a>
);
type NextLinkButtonProps = LinkProps & ButtonColorProps & { className?: string };

export const NextLinkButton: React.FC<NextLinkButtonProps> = ({ children, className, color = 'primary', ...props }) => (
  <NextLink {...props}>
    <a className={clsx(styles.button, className, styles[color])}>{children}</a>
  </NextLink>
);
