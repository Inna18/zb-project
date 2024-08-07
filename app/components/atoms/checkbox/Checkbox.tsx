import styles from '@/app/components/atoms/atoms.module.css';

import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasLabel: boolean;
  labelText?: string;
}

const Checkbox = (inputProps: InputProps) => {
  const { type, id, className, hasLabel, labelText } = inputProps;

  return (
    <div className={styles['checkbox-section']}>
      <input
        type={type}
        id={id}
        className={`${styles.checkbox} ${className}`}
      />
      {hasLabel && <label htmlFor={id}>{labelText}</label>}
    </div>
  );
};

export default Checkbox;
