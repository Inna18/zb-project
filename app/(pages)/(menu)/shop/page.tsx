import ShopTemplate from '@/app/components/templates/ShopTemplate';
import React, { Suspense } from 'react';

const Shop = () => {
  return (
    <div>
      <Suspense>
        <ShopTemplate />
      </Suspense>
    </div>
  );
};

export default Shop;
