import React from 'react';
import LoginFormTemplate from '../../../components/templates/LoginFormTemplate';

import styles from './page.module.css';

const Login = () => {
  return (
    <div className={styles['login-page']}>
      <LoginFormTemplate />
    </div>
  );
};

export default Login;
