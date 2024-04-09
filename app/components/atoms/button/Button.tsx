import styles from '../atoms.module.css';

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (btnProps: ButtonProps) => {
  const { className, value } = btnProps;

  return <button className={`${styles.button} ${styles[`${className}`]}`}>{value}</button>;
};

export default Button;
