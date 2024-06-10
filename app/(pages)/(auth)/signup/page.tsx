import styles from './page.module.css';

import React from 'react';
import SignupTemplate from '@/app/components/templates/SignupTemplate';

const Signup = () => {
  return (
    <div className={styles['signup-page']}>
      <SignupTemplate />
    </div>
  );
};

export default Signup;
