import styles from './organisms.module.css';

import React from 'react';
import Rating from '../molecules/Rating';

const Reviews = () => {
  return (
  <div className={styles.reviews}>
    <Rating />
  </div>
);
};

export default Reviews;
