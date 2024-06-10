'use client';

import styles from './templates.module.css';

import React, { useEffect } from 'react';
import Spinner from '../atoms/spinner/Spinner';
import Product from '@/app/service/useProductApi';
import ProductCard from '../molecules/ProductCard';

import { useSearchParams } from 'next/navigation';
import { useProduct } from '@/app/queries/queryHooks/product/useProduct';

const ShopTemplate = () => {
  const searchParams = useSearchParams()?.get('category');
  const {
    isLoading,
    data: productList,
    refetch,
  } = useProduct().useShopProductList('name', searchParams);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{searchParams ?? 'All'}</div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles['shop-list']}>
            {productList && productList.length <= 0 && (
              <div className={styles.empty}>No Items</div>
            )}
            {productList &&
              productList.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShopTemplate;
