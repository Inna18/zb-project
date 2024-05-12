import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import { useBestProductList } from '@/app/queries/queryHooks/product/useBestProductList';
import Product from '@/app/service/useProductApi';
import Spinner from '../atoms/spinner/Spinner';
import Image from 'next/image';
import arrowLoadIcon from '@/public/icons/angles-down-solid.svg';
import ProductCard from '../molecules/ProductCard';

const HomeBestItems = () => {
  const [loadCount, setLoadCount] = useState<number>(5);
  const {
    isLoading,
    isRefetching,
    data: productList,
    refetch,
  } = useBestProductList(loadCount);

  useEffect(() => {
    refetch();
  }, [loadCount]);

  const handleLoad = () => setLoadCount(loadCount + 5);

  return (
    <div className={styles['best-items']}>
      <div className={styles.title}>Best Items</div>
      <div>
        {(isLoading || isRefetching) && <Spinner />}
        {!isLoading && (
          <>
            <div className={styles['best-items-list']}>
              {productList && productList.length <= 0 && (
                <div className={styles.empty}>No Items</div>
              )}
              {productList &&
                productList.map((product: Product) => (
                  <ProductCard product={product} />
                ))}
            </div>
            {productList.length > 0 && (
              <div className={styles.load}>
                {loadCount <= 19 && (
                  <button onClick={handleLoad}>
                    <Image
                      src={arrowLoadIcon}
                      alt={'arrow-down'}
                      width={40}
                      height={40}
                    />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeBestItems;
