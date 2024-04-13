import styles from '../atoms.module.css';

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Button = (btnProps: ButtonProps) => {
  const { className, value, handleClick } = btnProps;

  return <button className={`${styles.button} ${styles[`${className}`]}`} onClick={handleClick?handleClick:undefined} >{value}</button>;
};

export default Button;
