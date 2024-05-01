import styles from './organisms.module.css';

import Image from 'next/image';
import Spinner from '../atoms/spinner/Spinner';

import React from 'react';
import { useProductList } from '@/app/queries/queryHooks/product/useProductList';
import { commonConstants } from '@/app/constants/common';
import Product from '@/app/service/useProductApi';

const ProductsList = () => {
  const { isLoading, data: productList } = useProductList();
  const { LIST_EMPTY } = commonConstants();

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles['product-list']}>
          {productList && productList.length <= 0 && <div>{LIST_EMPTY}</div>}
          {productList &&
            productList.map((product: Product) => (
              <div className={styles['product-card']} key={product._id}>
                {product && product.productImages.length === 0 && (
                  <div className={styles.centered}>No Image</div>
                )}
                {product &&
                  product.productImages.length > 0 &&
                  product.productImages[0] && (
                    <Image
                      src={product.productImages[0]}
                      alt={'user-profile'}
                      width={100}
                      height={100}
                    />
                  )}
                <div>
                  <div className={styles.name}>{product.name}</div>
                  <div>{product.category}</div>
                  <div>{product.brand}</div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ProductsList;
