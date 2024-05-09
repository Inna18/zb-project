'use client';

import styles from './templates.module.css';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Spinner from '../atoms/spinner/Spinner';
import Product from '@/app/service/useProductApi';
import starIcon from '@/public/icons/star-solid.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductList } from '@/app/queries/queryHooks/product/useProductList';

const ShopTemplate = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams()?.get('category');
  const {
    isLoading,
    data: productList,
    refetch,
  } = useProductList('name', searchParams);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const handleShopDetails = (productId: string, productCategory: string) => {
    push(`/shop/details?productId=${productId}`);
  };

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
                <div
                  key={product._id}
                  className={styles['shop-card']}
                  onClick={() =>
                    handleShopDetails(product._id!, product.category)
                  }
                >
                  <div className={styles['image-section']}>
                    {product.productImages &&
                      product.productImages?.length <= 0 && (
                        <div className={styles.centered}>No Image</div>
                      )}
                    {product.productImages &&
                      product.productImages.length > 0 && (
                        <Image
                          src={product.productImages[0]}
                          alt={'item-image'}
                          width={200}
                          height={200}
                        />
                      )}
                  </div>
                  <div className={styles['decription-section']}>
                    <div className={styles.name}>{product.name}</div>
                    <div>{product.brand}</div>
                    <div>
                      <span className={styles.category}>
                        #{product.category}
                      </span>
                    </div>
                    <div>{product.price}won</div>
                    <div className={styles.rating}>
                      <Image
                        src={starIcon}
                        alt={'item-image'}
                        width={18}
                        height={18}
                      />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShopTemplate;
