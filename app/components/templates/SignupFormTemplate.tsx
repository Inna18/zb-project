import React from 'react'
import Form from '../molecules/Form'
import Button from '../atoms/Button'

import styles from "./templates.module.css"

const LIST = [
  ["email", "signup-email", "signup", "Insert email", "Email"],
  ["password", "signup-password", "signup", "Insert password", "Password"],
  ["password", "signup-repeat-password", "signup", "Repeat password", "Repeat password"],
  ["string", "signup-username", "signup", "Insert username", "Username"]
]

const SignupFornTemplate = () => {
  return (
    <form className={`${styles.form} ${styles['form-signup']}`}>
      <h2>Signup</h2>
      <Form list={LIST} />
      <div className={styles.button}>
        <Button value="Signup" />
      </div>
    </form>
  )
}

export default SignupFornTemplate
