import React, { InputHTMLAttributes } from 'react'

import styles from "./atoms.module.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  changeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void
  hasLabel: boolean,
  labelText?: string
}

const Input = (inputProps: InputProps) => {
  const { type, id, className, placeholder, value, name, changeFunc, hasLabel, labelText } = inputProps;

  return (
    <div className={styles['input-section']}>
      {hasLabel && <label htmlFor={id}>{labelText}</label>}
      <input type={type} id={id} className={`${styles.input} ${className}`} placeholder={placeholder} name={name} value={value} onChange={changeFunc}/>
    </div>
  )
}

export default Input
