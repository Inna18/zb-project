import React, { ButtonHTMLAttributes } from 'react';

import styles from './atoms.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (btnProps: ButtonProps) => {
  const { className, value } = btnProps;

  return <button className={`${styles.button} ${className}`}>{value}</button>;
};

export default Button;
