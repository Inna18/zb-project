import styles from './page.module.css';

import React from 'react';
import SignupFormTemplate from '@/app/components/templates/SignupFormTemplate';

const Signup = () => {
  return (
    <div className={styles['signup-page']}>
      <SignupFormTemplate />
    </div>
  );
};

export default Signup;
