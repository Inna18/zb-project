'use client';

import React, { useState } from 'react'
import Form from '../molecules/Form'
import Button from '../atoms/Button'
import Image from '../atoms/Image';
import User, { createUser, deleteAllUsers } from "@/app/service/useUserApi"

import styles from "./templates.module.css"
import { limit } from '@/app/utils/text';


const LIST = ["email", "password", "name"]

const SignupFornTemplate = () => {
  const [signUser, setSignUser] = useState<User>({email: '', password: '', name: ''})
  const [imgName, setImgName] = useState<string|undefined>("")

  const userProperties = [signUser.email, signUser.password, signUser.name];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUser({...signUser, [name]: value});
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUser({...signUser, profileImg: e.currentTarget.files?.[0]});
    setImgName(e.currentTarget.files?.[0]?.name)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(signUser)
  }

  return (
    <form className={`${styles.form} ${styles['form-signup']}`} onSubmit={handleSubmit}>
      <h2  className={styles.title}>SIGNUP</h2>
      <Form list={LIST} formType={"signup"} userProps={userProperties} changeFunc={handleInputChange}/>
      <div className={styles['image-section']}>
        <Image uploadImg={handleImageUpload} />
        <div>{ limit(imgName, 20) }</div>
      </div>
      <div className={styles.button}>
        <Button value="Signup" />
      </div>
    </form>
  )
}

export default SignupFornTemplate

