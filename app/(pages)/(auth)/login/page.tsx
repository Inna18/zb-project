import styles from './page.module.css';

import React from 'react';
import LoginTemplate from '@/app/components/templates/LoginTemplate';

const Login = () => {
  return (
    <div className={styles['login-page']}>
      <LoginTemplate />
    </div>
  );
};

export default Login;
