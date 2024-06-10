import styles from './organisms.module.css';

import React from 'react';
import Rating from '../molecules/Rating';
import Comments from '../molecules/Comments';
import Spinner from '../atoms/spinner/Spinner';
import { useSearchParams } from 'next/navigation';
import { useComment } from '@/app/queries/queryHooks/comment/useComment';
import { useSession } from 'next-auth/react';

const Reviews = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const productId = searchParams?.get('productId');

  const { data: commentsData, isLoading } =
    useComment().useCommentsGetByProductId(productId!);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles.reviews}>
          {productId && session.data?.user?.email && (
            <>
              <Rating
                productId={productId}
                commentsData={commentsData}
                email={session.data ? session.data.user?.email : ''}
              />
              <Comments
                productId={productId}
                commentsData={commentsData}
                email={session.data ? session.data.user?.email : ''}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Reviews;
