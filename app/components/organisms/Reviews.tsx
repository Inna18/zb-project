import styles from './organisms.module.css';

import React from 'react';
import Rating from '../molecules/Rating';
import Comments from '../molecules/Comments';
import Button from '../atoms/button/Button';
import { deleteAllCommentsByProductId } from '@/app/service/useCommentApi';

const Reviews = () => {
  return (
    <div className={styles.reviews}>
      <Rating />
      <Comments />

      {/* <Button value='delete' onClick={() => deleteAllCommentsByProductId('dHyRhgmarNZHlsvDU4JpP6')} /> */}
    </div>
  );
};

export default Reviews;
