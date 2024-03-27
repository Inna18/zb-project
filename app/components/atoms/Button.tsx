import React from 'react'

import styles from "./atoms.module.css"

type ButtonProps = {
    className?: string
    text: string
}

const Button = (buttonProps: ButtonProps) => {
  const { className, text } = buttonProps;

  return (
    <button className={`${styles.button} ${className}`}>{text}</button>
  )
}

export default Button
