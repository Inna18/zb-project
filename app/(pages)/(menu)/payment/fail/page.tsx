import PaymentFailTemplate from '@/app/components/templates/PaymentFailTemplate';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <div>
      <Suspense>
        <PaymentFailTemplate />
      </Suspense>
    </div>
  );
};

export default page;
