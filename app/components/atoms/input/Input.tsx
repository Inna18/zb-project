import styles from '@/app/components/atoms/atoms.module.css';
import eyeOpened from '@/public/icons/eye-solid.svg';
import eyeClosed from '@/public/icons/eye-slash-solid.svg';

import React, { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  changeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasLabel?: boolean;
  labelText?: string;
}

const Input = (inputProps: InputProps) => {
  const {
    type,
    id,
    className,
    changeFunc,
    hasLabel,
    labelText,
    value,
    ...rest
  } = inputProps;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const checkType = () => {
    if (type === 'password' && showPassword) return 'text';
    if (type === 'password' && !showPassword) return 'password';
    if (type !== 'password') return type;
  };

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
      <span>
        <input
          {...rest}
          value={value || ''}
          type={checkType()}
          id={id}
          onChange={changeFunc}
          accept={type === 'file' ? 'image/*' : ''}
          className={styles[`${className}`]}
        />
        {type === 'password' && (
          <span>
            {value && showPassword === false && (
              <Image
                className={styles.icon}
                src={eyeOpened}
                alt={'eye-opened'}
                onClick={() => setShowPassword(true)}
              />
            )}
            {value && showPassword === true && (
              <Image
                className={styles.icon}
                src={eyeClosed}
                alt={'eye-opened'}
                onClick={() => setShowPassword(false)}
              />
            )}
          </span>
        )}
      </span>
    </div>
  );
};

export default Input;
