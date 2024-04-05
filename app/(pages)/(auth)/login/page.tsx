import styles from './page.module.css';

import React from 'react';
import LoginFormTemplate from '@/app/components/templates/LoginFormTemplate';

const Login = () => {
  return (
    <div className={styles['login-page']}>
      <LoginFormTemplate />
    </div>
  );
};

export default Login;
