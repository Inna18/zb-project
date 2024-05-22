import styles from './organisms.module.css';

import React from 'react';
import Rating from '../molecules/Rating';
import Comments from '../molecules/Comments';
import { useSearchParams } from 'next/navigation';
import { useCommentsGetByProductId } from '@/app/queries/queryHooks/comment/useCommentsGetByProductId';
import Spinner from '../atoms/spinner/Spinner';

const Reviews = () => {
  const searchParams = useSearchParams();
  const productId = searchParams?.get('productId');

  const { data: commentsData, isLoading: loadingGet } =
    useCommentsGetByProductId(productId!);

  return (
    <>
      {loadingGet && <Spinner />}
      {!loadingGet && (
        <div className={styles.reviews}>
          <Rating productId={productId!} commentsData={commentsData} />
          <Comments productId={productId!} commentsData={commentsData} />
        </div>
      )}
    </>
  );
};

export default Reviews;
