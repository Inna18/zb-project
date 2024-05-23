import styles from './organisms.module.css';

import React from 'react';
import Image from 'next/image';
import starIcon from '@/public/icons/star-solid.svg';
import Button from '../atoms/button/Button';

import { useProductStore } from '@/app/stores/useProductStore';
import { toUpper } from '@/app/utils/text';
import DescriptionImages from '../molecules/DescriptionImages';

const DetailsDescription = () => {
  const { product } = useProductStore((state) => state);

  return (
    <div className={styles.details}>
      <div className={styles.upper}>
        <DescriptionImages />
        <div className={styles.description}>
          <div className={styles.brand}>{toUpper(product.brand)}</div>
          <div>
            <span className={styles.category}>#{product.category}</span>
          </div>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.rating}>
            <Image src={starIcon} alt={'item-image'} width={18} height={18} />
            <span>{product.rating ? product.rating : 0}</span>
          </div>
          <div className={styles['price-section']}>
            <div>Price: </div>
            <div className={styles.price}>{product.price}won</div>
          </div>
          <div className={styles['btn-section']}>
            <Button value={'Add to Cart'} className='button2-long' />
            <Button value={'Buy'} className='button-long' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsDescription;
