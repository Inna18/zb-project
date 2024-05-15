import styles from './molecules.module.css';

import React from 'react';
import Image from 'next/image';
import Input from '../atoms/input/Input';
import Spinner from '../atoms/spinner/Spinner';
import deleteImgIcon from '@/public/icons/circle-xmark-solid.svg';
import Modal from '../atoms/modal/Modal';
import { useProductStore } from '@/app/stores/useProductStore';
import { useQueryClient } from '@tanstack/react-query';
import { useProductUpdateImages } from '@/app/queries/queryHooks/product/useProductUpdateImages';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useProductDeleteImg } from '@/app/queries/queryHooks/product/useProductDeleteImg';
import { useProductIdStore } from '@/app/stores/useProductIdStore';
import { useImgCancelCountStore } from '@/app/stores/useImgCancelCountStore';
import { useImgLimitCountStore } from '@/app/stores/useImgLimitCountStore';
import { useModal } from '@/app/hooks/useModal';
import { useModalStore } from '@/app/stores/useModalStore';

const { PRODUCT_IMAGE_LIMIT_ERROR } = modalMsgConstants;

const ProductImages = () => {
  const product = useProductStore((state) => state.product);
  const productId = useProductIdStore((state) => state.productId);
  const { incrementCancelCount, decrementCancelCount } = useImgCancelCountStore(
    (state) => state
  );
  const { imgLimitCount, incrementLimitCount } = useImgLimitCountStore(
    (state) => state
  );
  const { modal, setModal } = useModalStore((state) => state);
  const { open, close, isOpen } = useModal();

  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdateImg,
    data: updatedImages,
    isPending: pendingUpdateImg,
  } = useProductUpdateImages();
  const { mutate: mutateDeleteImg, isPending: pendingDeleteImg } =
    useProductDeleteImg();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    incrementLimitCount(); // image arr limit = 4, track images added
    incrementCancelCount(); // to delete added images if cancel product create/update
    if (imgLimitCount >= 4) {
      setModal({
        type: 'alert',
        content: PRODUCT_IMAGE_LIMIT_ERROR,
        onClose: close,
      });
      open();
    } else {
      let file = e.currentTarget.files;
      mutateUpdateImg(
        { id: productId!, images: [file?.[0]!] },
        {
          onSuccess: async (data) => {
            // invalidate -> setQueryData, reason - data in Form wasn't saved to db yet, so if we refetch from cache, data in form will disappear
            queryClient.setQueryData(['product', productId], () => ({
              ...product,
              productImages: data,
            }));
          },
        }
      );
    }
  };

  const handleDeleteImg = (url: string) => {
    decrementCancelCount();
    mutateDeleteImg(
      { id: productId!, imageUrl: url },
      {
        onSuccess: (data) => {
          // invalidate -> setQueryData, reason - data in Form wasn't saved to db yet, so if we refetch from cache, data in form will disappear
          queryClient.setQueryData(['product', productId], () => ({
            ...product,
            productImages: data,
          }));
        },
      }
    );
  };

  return (
    <>
      {(pendingUpdateImg || pendingDeleteImg) && <Spinner />}
      <div className={styles['product-images']}>
        {product.productImages && product.productImages.length <= 0 && (
          <div className={styles.centered}>No Images</div>
        )}
        <div className={styles['images-section']}>
          {product.productImages &&
            product.productImages.map((image: string, idx: number) => (
              <span key={image}>
                <Image
                  key={image}
                  src={image}
                  alt={'product-img'}
                  width={idx === 0 ? 210 : 70}
                  height={idx === 0 ? 210 : 70}
                />
                <a onClick={() => handleDeleteImg(image)}>
                  <Image
                    className={styles['icon-xs']}
                    src={deleteImgIcon}
                    alt={'update-icon'}
                  />
                </a>
              </span>
            ))}
        </div>
        <Input
          type='file'
          id='product-img'
          className='image'
          labelText='Add Image'
          hasLabel={true}
          name='productImg'
          changeFunc={handleImageUpload}
        />
      </div>
      <Modal
        selector={'portal'}
        show={isOpen}
        type={modal.type}
        content={modal.content}
        onClose={modal.onClose}
      />
    </>
  );
};

export default ProductImages;
