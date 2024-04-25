'use client';
import styles from '@/app/components/templates/templates.module.css';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/app/components/molecules/Form';
import Button from '@/app/components/atoms/button/Button';
import User from '@/app/service/useUserApi';
import Link from 'next/link';
import Input from '@/app/components/atoms/input/Input';
import Modal from '@/app/components/atoms/modal/Modal';
import Spinner from '@/app/components/atoms/spinner/Spinner';

import { limit } from '@/app/utils/text';
import { useFormValidator } from '@/app/hooks/useFormValidator';
import { useUserCreate } from '@/app/queries/queryHooks/user/useUserCreate';
import { useQueryClient } from '@tanstack/react-query';

const LIST = ['email', 'password', 'name'];

const SignupTemplate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [signUser, setSignUser] = useState<User>({
    email: '',
    password: '',
    name: '',
    role: '',
  });
  const [imgName, setImgName] = useState<string | undefined>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState({
    title: '',
    content: '',
    type: '',
  });
  const userProperties = [
    signUser.email,
    signUser.password,
    signUser.name,
    signUser.role,
  ];
  const { validateForm, emailError, passwordError } = useFormValidator();

  const { mutate, isSuccess, isLoading, isError, status } = useUserCreate();

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

  useEffect(() => {
    if (isSuccess) {
      setModalDetails((prevState) => {
        return {
          ...prevState,
          type: 'confirm',
          title: 'Confirm',
          content: 'Sign-up was successfull. Navigate to Login page?',
        };
      });
      setShowModal(true);
    }
    if (isError) {
      setModalDetails((prevState) => {
        return {
          ...prevState,
          type: 'alert',
          title: 'Alert',
          content: 'User already exists.',
        };
      });
      setShowModal(true);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(signUser.email, signUser.password)) {
      mutate(signUser, {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: () => {
          console.log('User create error');
        },
      });
    }
  };

  const handleMove = () => router.push('/login');

  return (
    <>
      {isLoading && <Spinner />}
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

        <Modal
          selector='portal'
          title={modalDetails.title}
          content={modalDetails.content}
          type={modalDetails.type}
          show={showModal}
          onClose={() => setShowModal(false)}
          onOk={handleMove}
        />
      </form>
    </>
  );
};

export default SignupTemplate;
