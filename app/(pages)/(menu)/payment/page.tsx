import React, { Suspense } from 'react';
import PaymentTemplate from '@/app/components/templates/PaymentTemplate';

const Payment = () => {
  return (
    <div>
      <Suspense>
        <PaymentTemplate />
      </Suspense>
    </div>
  );
};

export default Payment;
