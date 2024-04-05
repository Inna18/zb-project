'use client';
import styles from './templates.module.css';

import React, { useState } from 'react';
import Form from '@/app/components/molecules/Form';
import Button from '@/app/components/atoms/Button';
import User, { createUser } from '@/app/service/useUserApi';
import { limit } from '@/app/utils/text';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/app/components/atoms/Input';

const LIST = ['email', 'password', 'name'];

const SignupFormTemplate = () => {
  const router = useRouter();
  const [signUser, setSignUser] = useState<User>({
    email: '',
    password: '',
    name: '',
  });
  const [imgName, setImgName] = useState<string | undefined>('');
  const userProperties = [signUser.email, signUser.password, signUser.name];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUser({ ...signUser, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUser({ ...signUser, profileImg: e.currentTarget.files?.[0] });
    setImgName(e.currentTarget.files?.[0]?.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdUser = await createUser(signUser);
    if (createdUser) router.push('/login');
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
        required={true}
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

export default SignupFormTemplate;
