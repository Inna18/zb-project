'use client';

import React, { useState } from 'react'
import Form from '../molecules/Form'
import Button from '../atoms/Button'
import User, { createUser } from "@/app/service/useUserApi"

import styles from "./templates.module.css"


const LIST = ["email", "password", "name"]

const SignupFornTemplate = () => {
  const [signUser, setSignUser] = useState<User>({email: '', password: '', name: ''})
  const userProperties = [signUser.email, signUser.password, signUser.name];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUser({...signUser, [name]: value});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(signUser)
  }

  return (
    <form className={`${styles.form} ${styles['form-signup']}`} onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <Form list={LIST} formType={"signup"} userProps={userProperties} changeFunc={handleInputChange}/>
      <div className={styles.button}>
        <Button value="Signup" />
      </div>
    </form>
  )
}

export default SignupFornTemplate
function userState(): [any, any] {
  throw new Error('Function not implemented.')
}

