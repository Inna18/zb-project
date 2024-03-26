import React from 'react'

import styles from "./atoms.module.css"

type InputProps = {
    type: string,
    id: string,
    className?: string,
    placeholder: string
}

const Input = (inputProps: InputProps) => {
  const { type, id, className, placeholder } = inputProps;

  return (
    <input type={type} id={id} className={`${styles.input} ${className}`} placeholder={placeholder} />
  )
}

export default Input
