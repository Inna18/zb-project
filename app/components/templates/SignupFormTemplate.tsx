'use client';
import styles from './templates.module.css';

import React, { useState } from 'react';
import Form from '../molecules/Form';
import Button from '../atoms/Button';
import ImageUpload from '../atoms/ImageUpload';
import User, { createUser } from '@/app/service/useUserApi';
import { limit } from '@/app/utils/text';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LIST = ['email', 'password', 'name'];

const SignupFornTemplate = () => {
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
    let res = await createUser(signUser);
    if (res) router.push('/login');
  };

  return (
    <form
      className={`${styles.form} ${styles['form-signup']}`}
      onSubmit={handleSubmit}
    >
      <h2 className={styles.title}>SIGNUP</h2>
      <Form
        list={LIST}
        formType={'signup'}
        userProps={userProperties}
        changeFunc={handleInputChange}
        required={true}
      />
      <div className={styles['image-section']}>
        <ImageUpload uploadImg={handleImageUpload} />
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

export default SignupFornTemplate;
