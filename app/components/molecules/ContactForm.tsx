'use client';
import styles from './molecules.module.css';

import React, { useState } from 'react';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';
import Contact from '@/app/service/useContactApi';

import { useContactCreate } from '@/app/queries/queryHooks/contact/useContact';
import Spinner from '../atoms/spinner/Spinner';

const initState = {
  _id: '',
  name: '',
  email: '',
  message: '',
};

const ContactForm = () => {
  const [contact, setContact] = useState<Contact>(initState);
  const { mutate: mutateSaveContact, isPending: isPendingSaveContact } =
    useContactCreate();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = () => {
    mutateSaveContact(contact, {
      onSuccess: () => {
        setContact(initState);
      },
    });
  };

  return (
    <>
      {isPendingSaveContact && <Spinner />}
      <div className={styles['contact-form']}>
        <div className={styles.title}>Contact Us</div>
        <div className={styles.form}>
          <Input
            type='text'
            placeholder={'Insert your name'}
            hasLabel={false}
            name={'name'}
            value={contact.name}
            className='post-input'
            maxLength={20}
            changeFunc={handleInput}
          />
          <Input
            type='text'
            placeholder={'Insert your email'}
            hasLabel={false}
            name={'email'}
            value={contact.email}
            className='post-input'
            maxLength={20}
            changeFunc={handleInput}
          />
          <textarea
            name='message'
            id=''
            rows='14'
            cols='36'
            name='message'
            maxLength={100}
            value={contact.message}
            placeholder={'Insert your inquiry'}
            onChange={handleInput}
          />
          <Button value={'Submit'} onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default ContactForm;
