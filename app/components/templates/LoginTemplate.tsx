'use client';
import styles from './templates.module.css';

import Form from '@/app/components/molecules/Form';
import Button from '@/app/components/atoms/button/Button';
import Checkbox from '@/app/components/atoms/checkbox/Checkbox';
import User, { getUserByEmailAndPassword } from '@/app/service/useUserApi';
import Link from 'next/link';
import Modal from '../atoms/modal/Modal';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useFormValidator } from '@/app/hooks/useFormValidator';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useUserStore } from '@/app/stores/useUserStore';

const LIST = [
  { id: 1, value: 'email' },
  { id: 2, value: 'password' },
];
const { USER_LOGIN_ERROR } = modalMsgConstants;

const LoginTemplate = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [loginUser, setLoginUser] = useState<User>({ email: '', password: '' });
  const userProperties = [loginUser.email, loginUser.password];
  const { validateForm, emailError, passwordError } = useFormValidator();
  const { open, close, isOpen } = useModal();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm(loginUser.email, loginUser.password) == true) {
      const authUser = await signIn('credentials', {
        email: loginUser.email,
        password: loginUser.password,
        redirect: false,
      });
      console.log('authUser: ', authUser);
      if (authUser?.ok) {
        router.push('/home');
        const loggedUser = await getUserByEmailAndPassword(
          loginUser.email,
          loginUser.password
        );
        if (loggedUser) setUser(loggedUser);
      } else open();
    }
  };

  return (
    <>
      <form
        className={`${styles.form} ${styles['form-login']}`}
        onSubmit={handleSubmit}
      >
        <div className={styles.title}>LOGIN</div>
        <Form
          list={LIST}
          userProps={userProperties}
          changeFunc={handleInputChange}
          type='login'
          emailError={emailError}
          passwordError={passwordError}
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
      <Modal
        selector={'portal'}
        show={isOpen}
        type={'alert'}
        content={USER_LOGIN_ERROR}
        onClose={close}
      />
    </>
  );
};

export default LoginTemplate;
