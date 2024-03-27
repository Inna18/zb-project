import React from 'react'
import Form from '../organisms/Form'
import InputWithLabel from '../molecules/InputWithLabel'
import Button from '../atoms/Button'

import styles from "./templates.module.css"

const SignupFornTemplate = () => {
  return (
    <form className={`${styles.form} ${styles['form-signup']}`}>
      <Form title="Signup" inputList={[
        <InputWithLabel inputType="email" inputId="signup-email" inputClass={styles.input} inputPlaceholder="Insert email" labelValue="Email" />,
        <InputWithLabel inputType="password" inputId="signup-password" inputClass={styles.input} inputPlaceholder="Insert password" labelValue="Password" />,
        <InputWithLabel inputType="password" inputId="signup-repeat-password" inputClass={styles.input} inputPlaceholder="Repeat password" labelValue="Repeat password" />,
        <InputWithLabel inputType="string" inputId="signup-username" inputClass={styles.input} inputPlaceholder="Insert username" labelValue="Username" />
      ]}  />
      <div className={styles.button}>
        <Button text="Signup" />
      </div>
    </form>
  )
}

export default SignupFornTemplate
