import styles from './molecules.module.css';

import React, { useEffect, useState } from 'react';
import Comment from '@/app/service/useCommentApi';
import Image from 'next/image';
import Modal from '../atoms/modal/Modal';
import Spinner from '../atoms/spinner/Spinner';
import moment from 'moment';
import starIcon from '@/public/icons/star-solid.svg';
import removeIcon from '@/public/icons/xmark-solid.svg';

import { hideInfo } from '@/app/utils/text';
import { useComment } from '@/app/queries/queryHooks/comment/useComment';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { commonConstants } from '@/app/constants/common';

const RATING_DESCRIPTION = [
  { rating: 1, description: 'Worse' },
  { rating: 2, description: 'Bad' },
  { rating: 3, description: 'Okay' },
  { rating: 4, description: 'Good' },
  { rating: 5, description: 'Excellent' },
];
const { COMMENT_DELETE_SUCCESS } = modalMsgConstants;
const { LIST_EMPTY } = commonConstants;

interface CommentsProps {
  productId: string;
  commentsData: Comment[];
  email: string;
}
const Comments = (commentsProps: CommentsProps) => {
  const { productId, commentsData, email } = commentsProps;
  const [starNumArr, setStarNumArr] = useState<number[][]>();
  const {
    mutate: mutateDelete,
    isPending: pendingDelete,
    isSuccess,
  } = useComment().useCommentDeleteById(productId);
  const { open, close, isOpen } = useModal();

  useEffect(() => {
    if (commentsData) _getRatingArray();
  }, [commentsData]);

  useEffect(() => {
    if (isSuccess) open();
  }, [isSuccess]);

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

  const handleDelete = (commentId: string | undefined) => {
    if (commentId) mutateDelete(commentId);
  };

  return (
    <>
      {pendingDelete && <Spinner />}
      {starNumArr && (
        <div className={styles['comment-list']}>
          {commentsData && commentsData.length <= 0 && (
            <div className={styles.centered}>{LIST_EMPTY}</div>
          )}
          {commentsData &&
            commentsData.map((comment: Comment, idx: number) => (
              <div className={styles['comment-card']} key={comment._id}>
                <div>
                  <div className={styles.top}>
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
                    {email !== '' && email === comment.createdBy && (
                      <div>
                        <a onClick={() => handleDelete(comment._id)}>
                          <Image
                            src={removeIcon}
                            alt={'remove-icon'}
                            width={18}
                            height={18}
                          />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className={styles.content}>{comment.content}</div>
                  {comment.commentImage && (
                    <div>
                      <Image
                        src={comment.commentImage}
                        alt={''}
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
                <div className={styles['user-createdAt']}>
                  <div>
                    {comment.createdBy !== ''
                      ? hideInfo(comment.createdBy, 4)
                      : 'Anonymous'}
                  </div>
                  <div>
                    {moment(comment._createdAt).format('YYYY-MM-DD, HH:mm')}
                  </div>
                </div>
              </div>
            ))}
          <Modal
            selector={'portal'}
            show={isOpen}
            type={'alert'}
            content={COMMENT_DELETE_SUCCESS}
            onClose={close}
          />
        </div>
      )}
    </>
  );
};

export default Comments;
