import styles from './molecules.module.css';

import React from 'react';
import Image from 'next/image';
import Button from '../atoms/button/Button';
import starIcon from '@/public/icons/star-solid.svg';
import BarChart from '../atoms/barChart/BarChart';

const Rating = () => {
  return (
    <div className={styles['comment-rating']}>
      <div className={styles['rating-title']}>REVIEWS 1,000</div>
      <div className={styles['rating-container']}>
        <div className={styles.left}>
          <div className={styles['rating-number']}>
            <Image src={starIcon} alt={'item-image'} width={38} height={38} />
            <span>4.8</span>
          </div>
          <div>
            <Button
              value='리뷰 작성하기'
              className='button-long'
              onClick={() => {}}
            />
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
