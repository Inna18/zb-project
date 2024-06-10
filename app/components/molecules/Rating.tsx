import styles from './molecules.module.css';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../atoms/button/Button';
import starIcon from '@/public/icons/star-solid.svg';
import BarChart from '../atoms/barChart/BarChart';
import Popup from '../atoms/popup/Popup';
import Comment from '@/app/service/useCommentApi';
import Modal from '../atoms/modal/Modal';

import { useComment } from '@/app/queries/queryHooks/comment/useComment';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useProduct } from '@/app/queries/queryHooks/product/useProduct';
import { calcAverage, calcCount } from '@/app/utils/number';

const { COMMENT_CREATE_SUCCESS } = modalMsgConstants;

interface RatingProps {
  productId: string;
  commentsData: Comment[];
  email: string;
}
const Rating = (ratingProps: RatingProps) => {
  const { productId, commentsData, email } = ratingProps;
  const { open, close, isOpen } = useModal();
  const { mutate: mutateCreateComment, isSuccess } =
    useComment().useCommentCreate();
  const { mutate: mutateUpdateRating } = useProduct().useProductUpdateRating();

  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [ratingCount, setRatingCount] = useState<
    { value: number; count: number }[]
  >([]);
  const [ratingAverage, setRatingAverage] = useState<number>(0);

  const handleOpen = () => setIsOpenPopup(true);
  const handleCancel = () => setIsOpenPopup(false);
  const handleSave = (comment: Comment) => {
    mutateCreateComment({
      ...comment,
      rating: Number(comment.rating),
      createdBy: email,
      productId: productId,
    });
  };

  useEffect(() => {
    if (commentsData) {
      setRatingCount(calcCount(commentsData));
      setRatingAverage(calcAverage(commentsData));
      mutateUpdateRating({ id: productId, rating: ratingAverage });
    }
  }, [commentsData]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpenPopup(false);
      open();
    }
  }, [isSuccess]);

  return (
    <>
      <div className={styles['comment-rating']}>
        <div className={styles['rating-title']}>
          REVIEWS {commentsData.length}
        </div>
        <div className={styles['rating-container']}>
          <div className={styles.left}>
            <div className={styles['rating-number']}>
              <Image src={starIcon} alt={'item-image'} width={38} height={38} />
              <span>{ratingAverage ? ratingAverage.toFixed(1) : 0}</span>
            </div>
            <div>
              <Button
                value='Write Review'
                className='button-long'
                onClick={handleOpen}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <BarChart data={ratingCount.map((rating) => rating.count)} />
            </div>
          </div>
        </div>
      </div>
      {isOpenPopup && (
        <Popup
          selector='portal2'
          show={isOpenPopup}
          title='Comment'
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <Modal
        selector={'portal'}
        show={isOpen}
        type={'alert'}
        content={COMMENT_CREATE_SUCCESS}
        onClose={close}
      />
    </>
  );
};

export default Rating;
