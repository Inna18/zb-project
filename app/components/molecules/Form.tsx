import React from 'react'
import Input from '../atoms/Input';

import styles from "./molecules.module.css"

interface FormProps {
  list: (string | undefined)[][]
}

const Form = (formProps: FormProps) => {
  const { list } = formProps;

  return (
    <div className={styles['input-list']}>
      { list.map(input => (
        <Input type={input[0]} id={input[1]} className={input[2]} placeholder={input[3]} hasLabel={true} labelText={input[4]} /> 
      ))}
    </div>
  )
}

export default Form
