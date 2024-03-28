import React from 'react'
import Form from '../molecules/Form'
import Button from "../atoms/Button"
import Checkbox from '../atoms/Checkbox'

import styles from "./templates.module.css"

const LIST = [
  ["email", "login-email", "login", "Insert email", "Email"],
  ["password", "login-password", , "Insert password", "Password"]
]

const LoginFormTemplate = () => {

  return (
    <form className={`${styles.form} ${styles['form-login']}`}>
      <h2>Login</h2>
      <Form list={LIST} />
      <div>
        <Checkbox type="checkbox" id="login-checkbox" hasLabel={true} labelText="Remember me" /> 
      </div>
      <div className={styles.button}>
        <Button value="Login"/>
      </div>
    </form>
  )
}

export default LoginFormTemplate  