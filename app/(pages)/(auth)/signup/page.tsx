import styles from './page.module.css';

import React from 'react';
import SignupForm from '@/app/components/templates/SignupForm';

const Signup = () => {
  return (
    <div className={styles['signup-page']}>
      <SignupForm />
    </div>
  );
};

export default Signup;
