'use client';
import styles from './templates.module.css';

import React from 'react';
import ContactForm from '../molecules/ContactForm';
import ContactList from '../organisms/ContactList';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/app/stores/useUserStore';

const ContactTemplate = () => {
  const session = useSession();
  const user = useUserStore((state) => state.user);

  return (
    <div className={styles['contact-container']}>
      {session.status === 'authenticated' &&
        user.role === 'ADMIN' && <ContactList />}
      {(session.status === 'unauthenticated' ||
        (session.status === 'authenticated' &&
          user.role === 'USER')) && <ContactForm />}
    </div>
  );
};

export default ContactTemplate;
