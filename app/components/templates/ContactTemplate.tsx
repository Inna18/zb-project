'use client';
import styles from './templates.module.css';

import React from 'react';
import ContactForm from '../molecules/ContactForm';
import { useSession } from 'next-auth/react';
import ContactList from '../organisms/ContactList';

const ContactTemplate = () => {
  const session = useSession();

  return (
    <div className={styles['contact-container']}>
      {session.status === 'authenticated' &&
        session.data.user?.role === 'ADMIN' && <ContactList />}
      {(session.status === 'unauthenticated' ||
        (session.status === 'authenticated' &&
          session.data.user?.role === 'USER')) && <ContactForm />}
    </div>
  );
};

export default ContactTemplate;
