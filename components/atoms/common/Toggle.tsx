import clsx from 'clsx';
import React, { useCallback } from 'react';
import styles from './Toggle.module.css';

export const Toggle: React.VFC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'id' | 'className'> & {
    children: React.ReactNode;
    id: string;
    className?: string | undefined;
  }
> = ({ children, id, className, ...props }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div>
        <input name={id} type='checkbox' {...props} />
        <label htmlFor={id}></label>
      </div>
      {children ? <label htmlFor={id}>{children}</label> : null}
    </div>
  );
};

export const ToggleStandalone: React.VFC<{
  children: React.ReactNode;
  id: string;
  className?: string | undefined;
  value: boolean;
  onChange: (value: boolean) => void;
}> = ({ children, id, className, value, onChange }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked), [onChange]);
  return (
    <form className={clsx(styles.container, className)}>
      <div>
        <input id={id} type='checkbox' checked={value} onChange={handleChange} />
        <label htmlFor={id}></label>
      </div>
      {children ? <label htmlFor={id}>{children}</label> : null}
    </form>
  );
};
