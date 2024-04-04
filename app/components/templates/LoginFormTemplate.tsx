'use client';
import styles from './templates.module.css';

import React, { useState } from 'react';
import Form from '../molecules/Form';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import User from '@/app/service/useUserApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from "next-auth/react";

const LIST = ['email', 'password'];

const LoginFormTemplate = () => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useState<User>({ email: '', password: '' });
  const userProperties = [loginUser.email, loginUser.password];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const res = await signIn('credentials', {
      email: loginUser.email,
      password: loginUser.password,
      redirect: false
    });
    console.log(res)
    if (res?.ok) router.push('/home');
  };

  return (
    <form
      className={`${styles.form} ${styles['form-login']}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.title}>LOGIN</div>
      <Form
        list={LIST}
        formType={'login'}
        userProps={userProperties}
        changeFunc={handleInputChange}
        required={true}
      />
      <div>
        <Checkbox
          type='checkbox'
          id='login-checkbox'
          hasLabel={true}
          labelText='Remember me'
        />
      </div>
      <div className={styles.button}>
        <Button value='Login' />
      </div>
      <div className={styles.link}>
        <Link href={'/signup'}>Signup</Link>
      </div>
    </form>
  );
};

export default LoginFormTemplate;
