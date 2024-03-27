import React from 'react'
import Input from '../atoms/Input'

import styles from "./molecules.module.css"

type InputWithLabelProps = {
    inputType: string,
    inputId: string,
    inputClass: string,
    inputPlaceholder: string,
    labelValue: string
}

const InputWithLabel = (inputWithLabelProps: InputWithLabelProps) => {
  const { inputType, inputId, inputClass, inputPlaceholder, labelValue } = inputWithLabelProps;
  return (
    <div className={styles['input-label']}>
      <label htmlFor={inputId} >{labelValue}</label>
      <Input type={inputType} id={inputId} className={inputClass} placeholder={inputPlaceholder} />
    </div>
  )
}

export default InputWithLabel
