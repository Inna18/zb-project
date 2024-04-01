'use client';

import React, { useState } from 'react'
import Form from '../molecules/Form'
import Button from "../atoms/Button"
import Checkbox from '../atoms/Checkbox'

import styles from "./templates.module.css"
import User, { getUser } from '@/app/service/useUserApi'

const LIST = ["email", "password"]

const LoginFormTemplate = () => {
  const [loginUser, setLoginUser] = useState<User>({email: '', password: ''})
  const userProperties = [loginUser.email, loginUser.password];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginUser({...loginUser, [name]: value});
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getUser(loginUser.email);
  }

  return (
    <form className={`${styles.form} ${styles['form-login']}`} onSubmit={handleSubmit}>
      <div className={styles.title}>LOGIN</div>
      <Form list={LIST} formType={"login"} userProps={userProperties} changeFunc={handleInputChange} />
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