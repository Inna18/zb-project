import React from 'react'
import InputWithLabel from '../molecules/InputWithLabel'
import Button from '../atoms/Button'

import styles from "./organisms.module.css"

type FormProps = {
  title: string,
  inputList: JSX.Element[]
}

const Form = (formProps: FormProps) => {
  const { title, inputList } = formProps;

  return (
    <div className={styles.form}>
        <h2 className={styles['form-title']}>{title}</h2>
        { inputList.map((input, idx) => (
          <div key={idx} className={styles['form-section']}>
            {input}
          </div>   
        )) }
    </div>
  )
}

export default Form
