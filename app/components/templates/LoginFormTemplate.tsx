'use client';
import styles from './templates.module.css';

import React, { useState } from 'react';
import Form from '../molecules/Form';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import User, { getUserByEmailAndPassword } from '@/app/service/useUserApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    let res = await getUserByEmailAndPassword(
      loginUser.email,
      loginUser.password
    );
    if (res) router.push('/');
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
