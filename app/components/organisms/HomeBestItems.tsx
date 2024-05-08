import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import { useBestProductList } from '@/app/queries/queryHooks/product/useBestProductList';
import { useRouter } from 'next/navigation';
import Product from '@/app/service/useProductApi';
import Spinner from '../atoms/spinner/Spinner';
import Image from 'next/image';
import starIcon from '@/public/icons/star-solid.svg';
import arrowLoadIcon from '@/public/icons/angles-down-solid.svg';

const HomeBestItems = () => {
  const { push } = useRouter();
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

  const handleProductDetails = (productId: string, productCategory: string) => {
    push(`/shop?category=${productCategory}&productId=${productId}`);
  };

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
                  <div
                    key={product._id}
                    className={styles['best-item-card']}
                    onClick={() =>
                      handleProductDetails(product._id!, product.category)
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
