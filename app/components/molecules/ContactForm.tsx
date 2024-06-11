'use client';
import styles from './molecules.module.css';

import React, { useEffect, useState } from 'react';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';
import Contact from '@/app/service/useContactApi';
import Spinner from '../atoms/spinner/Spinner';
import Modal from '../atoms/modal/Modal';

import { useContact } from '@/app/queries/queryHooks/contact/useContact';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';

const initState = {
  _id: '',
  name: '',
  email: '',
  message: '',
};

const { CONTACT_CREATE_SUCCESS } = modalMsgConstants;

const ContactForm = () => {
  const { open, close, isOpen } = useModal();
  const [contact, setContact] = useState<Contact>(initState);
  const {
    mutate: mutateSaveContact,
    isPending: isPendingSaveContact,
    isSuccess,
  } = useContact().useContactCreate();

  useEffect(() => {
    if (isSuccess) {
      open();
      setContact(initState);
    }
  }, [isSuccess]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = () => mutateSaveContact(contact);

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
      <Modal
        selector={'portal'}
        show={isOpen}
        type={'alert'}
        content={CONTACT_CREATE_SUCCESS}
        onClose={close}
      />
    </>
  );
};

export default ContactForm;
