import React, { Suspense } from 'react';
import CheckoutTemplate from '@/app/components/templates/CheckoutTemplate';

const Checkout = () => {
  return (
    <div>
      <Suspense>
        <CheckoutTemplate />
      </Suspense>
    </div>
  );
};

export default Checkout;
