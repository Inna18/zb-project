import PaymentSuccessTemplate from '@/app/components/templates/PaymentSuccessTemplate';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <div>
      <Suspense>
        <PaymentSuccessTemplate />
      </Suspense>
    </div>
  );
};

export default page;
