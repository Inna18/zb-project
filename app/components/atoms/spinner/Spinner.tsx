import styles from '@/app/components/atoms/atoms.module.css';

import React from 'react';

const Spinner = () => {
  return (
    <div className={styles.centered}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Spinner;
