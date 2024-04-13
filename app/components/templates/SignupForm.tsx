'use client';
import styles from './templates.module.css';

import React, { useState } from 'react';
import Form from '@/app/components/molecules/Form';
import Button from '@/app/components/atoms/button/Button';
import User, { createUser } from '@/app/service/useUserApi';
import { limit } from '@/app/utils/text';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/app/components/atoms/input/Input';
import { useFormValidator } from '@/app/hooks/useFormValidator';

const LIST = ['email', 'password', 'name'];

const SignupForm = () => {
  const router = useRouter();
  const [signUser, setSignUser] = useState<User>({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const [imgName, setImgName] = useState<string | undefined>('');
  const userProperties = [
    signUser.email,
    signUser.password,
    signUser.name,
    signUser.role,
  ];
  const { validateForm, emailError, passwordError } = useFormValidator();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignUser({ ...signUser, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUser({ ...signUser, profileImg: e.currentTarget.files?.[0] });
    setImgName(e.currentTarget.files?.[0]?.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(signUser.email, signUser.password) == true) {
      const createdUser = await createUser(signUser);
      if (createdUser) router.push('/login');
    }
  };

  return (
    <form
      className={`${styles.form} ${styles['form-signup']}`}
      onSubmit={handleSubmit}
    >
      <h2 className={styles.title}>SIGNUP</h2>
      <Form
        list={LIST}
        userProps={userProperties}
        changeFunc={handleInputChange}
        type='signup'
        emailError={emailError}
        passwordError={passwordError}
      />
      <div className={styles['image-section']}>
        <Input
          type='file'
          id='profile-img'
          className='image'
          labelText='Upload image'
          hasLabel={true}
          name='profileImg'
          changeFunc={handleImageUpload}
        />
        <div>{limit(imgName, 20)}</div>
      </div>
      <div className={styles.button}>
        <Button value='Signup' />
      </div>
      <div className={styles.link}>
        <Link href={'/login'}>Login</Link>
      </div>
    </form>
  );
};

export default SignupForm;
