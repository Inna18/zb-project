import React from 'react'
import Checkbox from '../atoms/Checkbox'

import styles from "./molecules.module.css"

type CheckboxWithLabelProps = {
    checkboxId: string,
    checkboxValue: string,
    labelValue: string
}
const CheckboxWithLabel = (checkboxWithLabelProps: CheckboxWithLabelProps) => {
  const { checkboxId, checkboxValue, labelValue } = checkboxWithLabelProps;

  return (
    <div className={styles['checkbox-label']}>
      <Checkbox value={checkboxValue} id={checkboxId} />
      <label htmlFor={checkboxId}>{labelValue}</label>
    </div>
  )
}

export default CheckboxWithLabel
