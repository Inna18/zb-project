'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Spinner from '../atoms/spinner/Spinner';
import DetailsDescription from '../organisms/DetailsDescription';

import { useProductGetById } from '@/app/queries/queryHooks/product/useProductGetById';
import { useSearchParams } from 'next/navigation';
import { useProductStore } from '@/app/stores/useProductStore';
import { toUpper } from '@/app/utils/text';

const TABS = [
  { id: 1, value: 'about' },
  { id: 2, value: 'reviews' },
  { id: 3, value: 'delivery & return' },
];

const DetailsTemplate = () => {
  const { product, updateProduct } = useProductStore((state) => state);
  const productId = useSearchParams()?.get('productId');
  const { isLoading: loadingProduct, data: existingProduct } =
    useProductGetById(productId!);

  const [activeTab, setActiveTab] = useState<string>('about');
  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    updateProduct(existingProduct);
  }, [existingProduct]);

  return (
    <>
      {loadingProduct && <Spinner />}
      {!loadingProduct && product && (
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
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsTemplate;
