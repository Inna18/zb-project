import styles from './molecules.module.css';

import React from 'react';
import Contact from '@/app/service/useContactApi';

interface ContactCardProps {
  contact: Contact;
}
const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <div className={styles['contact-card']}>
      <div>Name: {contact.name}</div>
      <div>Email: {contact.email}</div>
      <div>Inquiry: {contact.message}</div>
    </div>
  );
};

export default ContactCard;
