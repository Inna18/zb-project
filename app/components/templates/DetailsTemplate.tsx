'use client';
import styles from './templates.module.css';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Spinner from '../atoms/spinner/Spinner';
import DetailsDescription from '../organisms/DetailsDescription';
import About from '../organisms/About';
import Reviews from '../organisms/Reviews';
import DeliveryReturn from '../organisms/DeliveryReturn';
import { useProductGetById } from '@/app/queries/queryHooks/product/useProductGetById';
import { useSearchParams } from 'next/navigation';
import { useProductStore } from '@/app/stores/useProductStore';
import { toUpper } from '@/app/utils/text';
import { useTabRenderer } from '@/app/hooks/useTabRenderer';

const TABS = [
  { id: 1, value: 'about', component: <About /> },
  { id: 2, value: 'reviews', component: <Reviews /> },
  { id: 3, value: 'delivery & return', component: <DeliveryReturn /> },
];

const DetailsTemplate = () => {
  const { product, setProduct } = useProductStore((state) => state);
  const productId = useSearchParams()?.get('productId');
  const { isLoading, data: existingProduct } = useProductGetById(productId!);

  const { handleActiveTab, tabRenderer, activeTab } = useTabRenderer(TABS);

  useEffect(() => {
    setProduct(existingProduct);
  }, [existingProduct]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && product && (
        <div className={styles.details}>
          <DetailsDescription />
          <div className={styles.lower}>
            <div className={styles['link-section']}>
              {TABS.map((tab) => (
                <Link
                  key={tab.id}
                  onClick={() => handleActiveTab(tab.value)}
                  href={''}
                  className={activeTab === tab.value ? styles.active : ''}
                >
                  {toUpper(tab.value)}
                </Link>
              ))}
            </div>
            <div className={styles['details-tabs']}>
              {TABS && tabRenderer()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsTemplate;
