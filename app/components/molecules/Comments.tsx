import styles from './molecules.module.css';

import React, { useEffect, useState } from 'react';
import Spinner from '../atoms/spinner/Spinner';
import Comment from '@/app/service/useCommentApi';
import Image from 'next/image';
import moment from 'moment';
import starIcon from '@/public/icons/star-solid.svg';

import { useCommentsGetByProductId } from '@/app/queries/queryHooks/comment/useCommentsGetByProductId';
import { useSearchParams } from 'next/navigation';

const RATING_DESCRIPTION = [
  { rating: 1, description: 'Worse' },
  { rating: 2, description: 'Bad' },
  { rating: 3, description: 'Okay' },
  { rating: 4, description: 'Good' },
  { rating: 5, description: 'Excellent' },
];
interface CommentsProps {
  productId: string;
  commentsData: Comment[];
}
const Comments = (commentsProps: CommentsProps) => {
  const { productId, commentsData } = commentsProps;
  const [starNumArr, setStarNumArr] = useState<number[][]>();

  useEffect(() => {
    if (commentsData) _getRatingArray();
  }, [commentsData]);

  const _getRatingArray = () => {
    let array1 = [];
    let array2 = [];
    for (let i = 0; i < commentsData.length; i++) {
      for (let j = 1; j <= Number(commentsData[i]?.rating); j++) {
        array2.push(j);
      }
      array1.push(array2);
      array2 = [];
    }
    setStarNumArr(array1);
    array1 = [];
  };

  const _getDescriptionByRating = (ratingParam: number) => {
    return RATING_DESCRIPTION.filter(
      (ratingDescriptionEl) => ratingDescriptionEl.rating === ratingParam
    )[0].description;
  };

  return (
    <>
      {starNumArr && (
        <div className={styles['comment-list']}>
          {commentsData &&
            commentsData.map((comment: Comment, idx: number) => (
              <div className={styles['comment-card']} key={comment._id}>
                <div>
                  <div className={styles['rating-section']}>
                    {starNumArr &&
                      starNumArr[idx] &&
                      starNumArr[idx].map((star) => (
                        <Image
                          key={star}
                          src={starIcon}
                          alt={'item-image'}
                          width={18}
                          height={18}
                        />
                      ))}
                    {starNumArr && starNumArr[idx] && (
                      <span>
                        {_getDescriptionByRating(starNumArr[idx].length)}
                      </span>
                    )}
                  </div>
                  <div className={styles.content}>{comment.content}</div>
                  {comment.commentImage && (
                    <div>
                      <Image
                        src={comment.commentImage!}
                        alt={''}
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
                <div className={styles['user-createdAt']}>
                  <div>{comment.createdBy}</div>
                  <div>
                    {moment(comment._createdAt).format('YYYY-MM-DD, HH:mm')}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Comments;
