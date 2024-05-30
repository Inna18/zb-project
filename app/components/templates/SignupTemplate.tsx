'use client';
import styles from '@/app/components/templates/templates.module.css';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/app/components/molecules/Form';
import Button from '@/app/components/atoms/button/Button';
import User from '@/app/service/useUserApi';
import Link from 'next/link';
import Input from '@/app/components/atoms/input/Input';
import Spinner from '@/app/components/atoms/spinner/Spinner';
import Modal from '../atoms/modal/Modal';

import { limit } from '@/app/utils/text';
import { useFormValidator } from '@/app/hooks/useFormValidator';
import { useUserCreate } from '@/app/queries/queryHooks/user/useUserCreate';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useModalStore } from '@/app/stores/useModalStore';

const LIST = [
  { id: 1, value: 'email' },
  { id: 2, value: 'password' },
  { id: 3, value: 'name' },
];
const { USER_CREATE_SUCCESS, USER_CREATE_ERROR } = modalMsgConstants;

const SignupTemplate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { modal, setModal } = useModalStore((state) => state);
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
  const { mutate: mutateCreate, isPending } = useUserCreate();
  const { open, close, isOpen } = useModal();

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
    if (validateForm(signUser.email, signUser.password)) {
      mutateCreate(signUser, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['users'] });
          setModal({
            type: 'confirm',
            content: USER_CREATE_SUCCESS,
            onOk: handleMove,
            onClose: handleReset,
          });
          open();
        },
        onError: () => {
          setModal({
            type: 'alert',
            content: USER_CREATE_ERROR,
            onClose: close,
          });
          open();
        },
      });
    }
  };

  const handleMove = () => router.push('/login');

  const handleReset = () => {
    close();
    setSignUser({ email: '', password: '', name: '', role: '' });
  };

  return (
    <>
      {isPending && <Spinner />}
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
      <Modal
        selector={'portal'}
        show={isOpen}
        type={modal.type}
        content={modal.content}
        onOk={modal.onOk}
        onClose={modal.onClose}
      />
    </>
  );
};

export default SignupTemplate;
