'use client';

import styles from './templates.module.css';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const PaymentFailTemplate = () => {
  const errorCode = useSearchParams()?.get('code');
  const errorMessage = useSearchParams()?.get('message');

  return (
    <>
      {errorCode && errorMessage && (
        <main>
          <div id='info' className={styles.container} style={{ width: '100%' }}>
            <img
              width='100px'
              src='https://static.toss.im/lotties/error-spot-no-loop-space-apng.png'
              alt='에러 이미지'
            />
            <h2>결제를 실패했어요</h2>
          </div>
        </main>
      )}
    </>
  );
};

export default PaymentFailTemplate;
