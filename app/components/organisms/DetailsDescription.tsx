import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import starIcon from '@/public/icons/star-solid.svg';
import Button from '../atoms/button/Button';
import DescriptionImages from '../molecules/DescriptionImages';
import Product from '@/app/service/useProductApi';
import Modal from '../atoms/modal/Modal';

import { useProductStore } from '@/app/stores/useProductStore';
import { useUserStore } from '@/app/stores/useUserStore';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';
import { toUpper } from '@/app/utils/text';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { useCartUpdate } from '@/app/queries/queryHooks/cart/useCartUpdate';
import { useProductUpdateQuantity } from '@/app/queries/queryHooks/product/useProductUpdateQuantity';
import { useModalStore } from '@/app/stores/useModalStore';
import { useModal } from '@/app/hooks/useModal';
import { useRouter } from 'next/navigation';
import { modalMsgConstants } from '@/app/constants/modalMsg';

const { CART_UPDATE_SUCCESS, LOGIN_REQUEST } = modalMsgConstants;

const DetailsDescription = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const session = useSession();
  const { product, updateProduct } = useProductStore((state) => state);
  const { user } = useUserStore((state) => state);
  const { totalCost, addToTotalCost } = useTotalCostStore((state) => state);
  const { modal, setModal } = useModalStore((state) => state);
  const { mutate: mutateUpdate } = useCartUpdate();
  const { mutate: mutateUpdateQuantity } = useProductUpdateQuantity();
  const [count, setCount] = useState<number>(1);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { open, close, isOpen } = useModal();

  useEffect(() => {
    setDisabled(product.quantity! <= 0);
  }, [product.quantity]);

  const handleDecrease = () => {
    if (count >= 2) setCount(count - 1);
  };
  const handleIncrease = () => {
    if (count < product.quantity!) setCount(count + 1);
  };

  const handleMove = () => router.push('/cart');
  const handleLogin = () => router.push('/login');

  const handleAddCart = () => {
    if (session.status === 'unauthenticated') {
      setModal({
        type: 'confirm',
        content: LOGIN_REQUEST,
        onOk: handleLogin,
        onClose: close,
      });
      open();
    } else {
      const productCountSet = {
        productId: product._id!,
        count: count,
        _key: product._id!,
      };
      mutateUpdate(
        { userId: user._id!, prodCountSet: productCountSet },
        {
          onSuccess: () => {
            mutateUpdateQuantity(
              { id: product._id!, quantity: product.quantity! - count },
              {
                onSuccess: (data) => {
                  queryClient.setQueryData(
                    ['product', product._id!],
                    (old: Product) => ({
                      ...old,
                      quantity: data.quantity,
                    })
                  );
                  updateProduct({ ...product, quantity: data.quantity });
                  product.quantity! > 0 ? setCount(1) : setCount(0);

                  setModal({
                    type: 'confirm',
                    content: CART_UPDATE_SUCCESS,
                    onOk: handleMove,
                    onClose: close,
                  });
                  open();
                  if (product.price) addToTotalCost(product.price * count)
                },
              }
            );
          },
        }
      );
    }
  };

  return (
    <div className={styles.details}>
      <div className={styles.upper}>
        <DescriptionImages />
        <div className={styles.description}>
          <div className={styles.brand}>{toUpper(product.brand)}</div>
          <div>
            <span className={styles.category}>#{product.category}</span>
          </div>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.rating}>
            <Image src={starIcon} alt={'item-image'} width={18} height={18} />
            <span>{product.rating ? product.rating : 0}</span>
          </div>
          <div className={styles['price-section']}>
            <div>Price: </div>
            <div className={styles.price}>{product.price}won</div>
          </div>
          {session.data?.user?.role !== 'ADMIN' && (
            <>
              <div className={styles['count-section']}>
                {disabled ? (
                  <div className={styles.soldout}>Sold Out</div>
                ) : (
                  <div className={styles.count}>
                    <a onClick={handleDecrease}>-</a>
                    <div>{count}</div>
                    <a onClick={handleIncrease}>+</a>
                  </div>
                )}
              </div>
              <div className={styles['btn-section']}>
                <Button
                  value={'Add to Cart'}
                  className='button2-long'
                  disabled={disabled}
                  onClick={handleAddCart}
                />
                <Button
                  value={'Buy'}
                  className='button-long'
                  disabled={disabled}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        selector={'portal'}
        show={isOpen}
        type={modal.type}
        content={modal.content}
        onOk={modal.onOk}
        onClose={modal.onClose}
      />
    </div>
  );
};

export default DetailsDescription;
