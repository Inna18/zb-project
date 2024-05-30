import styles from './molecules.module.css';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../atoms/button/Button';
import starIcon from '@/public/icons/star-solid.svg';
import BarChart from '../atoms/barChart/BarChart';
import Popup from '../atoms/popup/Popup';
import Comment from '@/app/service/useCommentApi';
import Modal from '../atoms/modal/Modal';

import { useCommentCreate } from '@/app/queries/queryHooks/comment/useCommentCreate';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useQueryClient } from '@tanstack/react-query';
import { useProductUpdateRating } from '@/app/queries/queryHooks/product/useProductUpdateRating';
import Product from '@/app/service/useProductApi';

const { COMMENT_CREATE_SUCCESS } = modalMsgConstants;

interface RatingProps {
  productId: string;
  commentsData: Comment[];
  email: string;
}
const Rating = (ratingProps: RatingProps) => {
  const { productId, commentsData, email } = ratingProps;
  const queryClient = useQueryClient();

  const { open, close, isOpen } = useModal();
  const { mutate: mutateSave } = useCommentCreate();
  const { mutate: mutateUpdate } = useProductUpdateRating();

  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [ratingCount, setRatingCount] = useState<
    { value: number; count: number }[]
  >([]);
  const [ratingAverage, setRatingAverage] = useState<number>(0);

  const handleOpen = () => setIsOpenPopup(true);

  const handleCancel = () => setIsOpenPopup(false);

  const handleSave = (comment: Comment) => {
    mutateSave(
      {
        ...comment,
        rating: Number(comment.rating),
        createdBy: email,
        productId: productId!,
      },
      {
        onSuccess: (data) => {
          setIsOpenPopup(false);
          open();
          queryClient.setQueryData(
            ['comments', { productId: productId }],
            (old: Comment[]) => [...old, data]
          );
          queryClient.refetchQueries({
            queryKey: ['comments', { productId: productId }],
          });
        },
      }
    );
  };

  useEffect(() => {
    if (commentsData) {
      _calcCount();
      _calcAverage();
    }
  }, [commentsData]);

  const _calcCount = () => {
    let tempCountArr = [];
    for (let i = 5; i >= 1; i--) {
      let num = commentsData.filter((comment) => comment.rating === i).length;
      tempCountArr.push({ value: i, count: num });
    }
    setRatingCount(tempCountArr);
  };

  const _calcAverage = () => {
    let calc =
      commentsData.reduce((sum, value) => {
        return sum + value.rating!;
      }, 0) / commentsData.length;
    setRatingAverage(calc);
    mutateUpdate(
      { id: productId, rating: calc },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['product', productId], (old: Product) => ({
            ...old,
            rating: data.rating,
          }));
        },
      }
    );
  };

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
                value='리뷰 작성하기'
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
