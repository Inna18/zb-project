import styles from './organisms.module.css';

import React from 'react';
import ContactCard from '../molecules/ContactCard';
import Contact from '@/app/service/useContactApi';

import { useContact } from '@/app/queries/queryHooks/contact/useContact';

const ContactList = () => {
  const { data: contacts, isLoading } = useContact().useContactList();

  return (
    <div className={styles['contact-list']}>
      <div className={styles.title}>
        <span>Contact Inquiries</span>
      </div>
      {contacts &&
        contacts.length > 0 &&
        contacts.map((contact: Contact) => <ContactCard contact={contact} />)}
    </div>
  );
};

export default ContactList;
