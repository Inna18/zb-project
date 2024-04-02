import React from 'react';
import SignupFormTemplate from '../components/templates/SignupFormTemplate';

import styles from './page.module.css';

const Signup = () => {
  return (
    <div className={styles['signup-page']}>
      <SignupFormTemplate />
    </div>
  );
};

export default Signup;
