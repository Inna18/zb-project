import styles from './organisms.module.css';

import React from 'react';
import Image from 'next/image';
import Spinner from '../atoms/spinner/Spinner';

import { useProductGetById } from '@/app/queries/queryHooks/product/useProductGetById';
import { numberWithCommas } from '@/app/utils/number';

interface CheckoutProductProps {
  productId: string;
  count: number;
}

const CheckoutProduct = (checkoutProductProps: CheckoutProductProps) => {
  const { productId, count } = checkoutProductProps;
  const { data: product, isLoading } = useProductGetById(productId);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div>
            <div className={styles['checkout-product-section']}>
              <div className={styles.product}>
                <Image
                  src={product.productImages[0]}
                  alt={''}
                  width={100}
                  height={100}
                />
                <div>
                  <div>Product name: {product.name}</div>
                  <div>Quantity: {count} pcs</div>
                  <div>
                    Total price: ₩{numberWithCommas(product.price * count)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutProduct;
