import React from 'react'
import Form from '../organisms/Form'
import CheckboxWithLabel from '../molecules/CheckboxWithLabel'
import Button from "../atoms/Button"
import InputWithLabel from '../molecules/InputWithLabel'

import styles from "./templates.module.css"

const LoginFormTemplate = () => {
  return (
    <form className={`${styles.form} ${styles['form-login']}`}>
      <Form title="Login" inputList={[
        <InputWithLabel inputType="email" inputId="login-email" inputClass={styles.input} inputPlaceholder="Insert email" labelValue="Email" />,
        <InputWithLabel inputType="password" inputId="login-password" inputClass={styles.input} inputPlaceholder="Insert password" labelValue="Password" />
      ]}  />
      <div className={styles.checkbox}>
        <CheckboxWithLabel checkboxId="login" checkboxValue="true" labelValue="Remember me" /> 
      </div>
      <div className={styles.button}>
        <Button text="Login" />
      </div>
    </form>
  )
}

export default LoginFormTemplate
