import styles from './organisms.module.css';

import React from 'react';

import { PortableText } from '@portabletext/react';
import { usePolicy } from '@/app/queries/queryHooks/policy/usePolicy';

const DeliveryReturn = () => {
  const { data: shippingPolicyData, isLoading } =
    usePolicy().useShippingPolicyGet();

  return (
    <>
      {!isLoading && (
        <div className={styles['delivery-return']}>
          <PortableText value={shippingPolicyData.content} />
        </div>
      )}
    </>
  );
};

export default DeliveryReturn;
