import styles from '../atoms.module.css';

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (btnProps: ButtonProps) => {
  const { className, value, ...rest } = btnProps;

  return (
    <button className={`${styles.button} ${styles[`${className}`]}`} {...rest}>
      {value}
    </button>
  );
};

export default Button;
