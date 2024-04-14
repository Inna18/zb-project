import styles from './page.module.css';

import React from 'react';
import LoginForm from '@/app/components/templates/LoginForm';

const Login = () => {
  return (
    <div className={styles['login-page']}>
      <LoginForm />
    </div>
  );
};

export default Login;
