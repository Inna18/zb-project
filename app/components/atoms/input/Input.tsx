import styles from '../atoms.module.css';

import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  changeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasLabel?: boolean;
  labelText?: string;
}

const Input = (inputProps: InputProps) => {
  const { type, id, className, changeFunc, hasLabel, labelText, ...rest } =
    inputProps;

  return (
    <div className={styles[`${className}-section`]}>
      {hasLabel && (
        <label
          className={type === 'file' ? styles[`${className}-upload`] : ''}
          htmlFor={id}
        >
          {labelText}
        </label>
      )}
      <input
        {...rest}
        type={type}
        id={id}
        onChange={changeFunc}
        accept={type === 'file' ? 'image/*' : ''}
        className={styles[`${className}`]}
      />
    </div>
  );
};

export default Input;
