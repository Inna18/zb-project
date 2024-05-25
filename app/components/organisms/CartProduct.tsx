import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import payIcon from '@/public/icons/money-check-dollar-solid.svg';
import removeIcon from '@/public/icons/xmark-solid.svg';
import Spinner from '../atoms/spinner/Spinner';

import { useProductGetById } from '@/app/queries/queryHooks/product/useProductGetById';
import { numberWithCommas } from '@/app/utils/number';

interface CartProductProps {
  productId: string;
  count: number;
  idx: number;
  countTotalProductCost: (total: number) => void;
}

const CartProduct = (cartProductProps: CartProductProps) => {
  const { productId, count, idx, countTotalProductCost } = cartProductProps;
  const { data: product, isLoading: loadingProduct } =
    useProductGetById(productId);

  useEffect(() => {
    if (product) countTotalProductCost(product.price * count);
  }, [product]);

  return (
    <>
      {loadingProduct && <Spinner />}
      {!loadingProduct && (
        <tr className={styles.body}>
          <td>{idx}</td>
          <td>
            {product.productImages ? (
              <Image
                src={product.productImages[0]}
                alt={''}
                width={70}
                height={70}
              />
            ) : (
              <div>No Image</div>
            )}
          </td>
          <td>{product.name}</td>
          <td>₩{numberWithCommas(product.price)}</td>
          <td>{count}</td>
          <td>₩{numberWithCommas(product.price * count)}</td>
          <td>
            <div className={styles.buttons}>
              <a onClick={() => {}}>
                <Image src={payIcon} alt={'pay-icon'} width={20} height={20} />
              </a>
              <a onClick={() => {}}>
                <Image
                  src={removeIcon}
                  alt={'remove-icon'}
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default CartProduct;
