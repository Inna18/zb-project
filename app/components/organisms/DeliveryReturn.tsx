import styles from './organisms.module.css';

import React from 'react';

import { PortableText } from '@portabletext/react';
import { useShippingPolicyGet } from '@/app/queries/queryHooks/policy/useShippingPolicyGet';

const DeliveryReturn = () => {
  const { data: shippingPolicyData, isLoading: loadingGet } =
    useShippingPolicyGet();

  return (
    <>
      {!loadingGet && (
        <div className={styles['delivery-return']}>
          <PortableText value={shippingPolicyData.content} />
        </div>
      )}
    </>
  );
};

export default DeliveryReturn;
