import clsx from 'clsx';
import { toggleCheckbox, toggleLabel } from './Toggle.module.css';
export const Toggle: React.VFC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'id' | 'className'> & {
    children: React.ReactNode;
    id: string;
  }
> = ({ children, id, ...props }) => {
  return (
    <>
      <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input name={id} type='checkbox' className={toggleCheckbox} {...props} />
        <label htmlFor={id} className={toggleLabel}></label>
      </div>
      <label htmlFor={id} className='text-xs text-gray-700'>
        {children}
      </label>
    </>
  );
};
