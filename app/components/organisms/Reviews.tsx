import styles from './organisms.module.css';

import React from 'react';
import Rating from '../molecules/Rating';
import Comments from '../molecules/Comments';
import Spinner from '../atoms/spinner/Spinner';
import { useSearchParams } from 'next/navigation';
import { useCommentsGetByProductId } from '@/app/queries/queryHooks/comment/useCommentsGetByProductId';
import { useSession } from 'next-auth/react';

const Reviews = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const productId = searchParams?.get('productId');

  const { data: commentsData, isLoading: loadingGet } =
    useCommentsGetByProductId(productId!);

  return (
    <>
      {loadingGet && <Spinner />}
      {!loadingGet && (
        <div className={styles.reviews}>
          <Rating
            productId={productId!}
            commentsData={commentsData}
            email={session.data ? session.data.user?.email! : ''}
          />
          <Comments
            productId={productId!}
            commentsData={commentsData}
            email={session.data ? session.data.user?.email! : ''}
          />
        </div>
      )}
    </>
  );
};

export default Reviews;
