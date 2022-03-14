import React from 'react';
import styles from './TextField.module.css';
import clsx from 'clsx';

export type TextFieldProps = {
  children?: React.ReactNode;
  className?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

export const TextField: React.VFC<TextFieldProps> = ({ children, className, inputProps }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <label>{children}</label>
      <input type='text' {...inputProps} />
    </div>
  );
};

export type TextFieldMultiLineProps = {
  children?: React.ReactNode;
  className?: string;
  inputProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};
export const TextFieldMultiLine: React.VFC<TextFieldMultiLineProps> = ({ children, className, inputProps }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <label>{children}</label>
      <textarea {...inputProps} />
    </div>
  );
};
