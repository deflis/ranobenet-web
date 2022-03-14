import React from 'react';
import clsx from 'clsx';
import styles from './CheckBox.module.css';

export type CheckBoxProps = {
  children?: React.ReactNode;
  className?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

export const CheckBox: React.VFC<CheckBoxProps> = ({ children, className, inputProps }) => (
  <label className={clsx(styles.container, className)}>
    <input type='checkbox' {...inputProps} />
    <span>{children}</span>
  </label>
);
