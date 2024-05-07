import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Product from '@/app/service/useProductApi';
import Spinner from '../atoms/spinner/Spinner';
import Image from 'next/image';
import starIcon from '@/public/icons/star-solid.svg';
import arrowLoadIcon from '@/public/icons/angles-down-solid.svg';
import { useBestProductList } from '@/app/queries/queryHooks/product/useBestProductList';
import { useQueryClient } from '@tanstack/react-query';

const HomeBestItems = () => {
    const queryClient = useQueryClient();
    const [loadCount, setLoadCount] = useState<number>(5);
    const { isLoading, isRefetching, data: productList, refetch } = useBestProductList(loadCount);

    useEffect(() => {
        refetch();
    }, [loadCount]);

    const handleLoad = () => {
        setLoadCount(loadCount + 5);
    }

  return (
    <div className={styles['best-items']}>
      <div className={styles.title}>Best Items</div>
      <div>
        {(isLoading || isRefetching) && <Spinner />}
        {!isLoading && (
            <>
                <div className={styles['best-items-list']}>
                    {productList && productList.length <= 0 && <div>No Items</div>}
                    {productList && productList.map((product: Product) => (
                        <div key={product._id} className={styles['best-item-card']}>
                            <div className={styles['image-section']}>
                                {product.productImages && product.productImages?.length <= 0 && (
                                    <div className={styles.centered}>No Image</div>
                                )}
                                {product.productImages && product.productImages.length > 0 && (
                                    <Image src={product.productImages[0]} alt={'item-image'} width={200} height={200}/>)
                                }
                            </div>
                            <div className={styles['decription-section']}>
                                <div className={styles.name}>{product.name}</div>
                                <div>{product.brand}</div>
                                <div><span className={styles.category}>#{product.category}</span></div>
                                <div>{product.price}won</div>
                                <div className={styles.rating}>
                                    <Image src={starIcon} alt={'item-image'} width={18} height={18}/>
                                    <span>{product.rating ? product.rating : '5.0'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.load}>
                    {loadCount <= 19 && (
                        <button onClick={handleLoad}>
                            <Image src={arrowLoadIcon} alt={'arrow-down'} width={40} height={40}/>
                        </button>
                    )}
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default HomeBestItems;
