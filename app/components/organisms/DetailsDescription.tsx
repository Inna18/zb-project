import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import starIcon from '@/public/icons/star-solid.svg';
import Button from '../atoms/button/Button';
import DescriptionImages from '../molecules/DescriptionImages';
import Modal from '../atoms/modal/Modal';

import { useProductStore } from '@/app/stores/useProductStore';
import { useUserStore } from '@/app/stores/useUserStore';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';
import { toUpper } from '@/app/utils/text';
import { useSession } from 'next-auth/react';
import { useCart } from '@/app/queries/queryHooks/cart/useCart';
import { useProduct } from '@/app/queries/queryHooks/product/useProduct';
import { useModalStore } from '@/app/stores/useModalStore';
import { useModal } from '@/app/hooks/useModal';
import { useRouter } from 'next/navigation';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useBuyListStore } from '@/app/stores/useBuyListStore';
import { numberWithCommas } from '@/app/utils/number';

const { CART_UPDATE_SUCCESS, LOGIN_REQUEST } = modalMsgConstants;

const DetailsDescription = () => {
  const router = useRouter();
  const session = useSession();
  const product = useProductStore((state) => state.product);
  const user = useUserStore((state) => state.user);
  const addToTotalCost = useTotalCostStore((state) => state.addToTotalCost);
  const setBuyList = useBuyListStore((state) => state.setBuyList);
  const { modal, setModal } = useModalStore((state) => state);
  const { mutate: mutateUpdateCart } = useCart().useCartUpdate();
  const { mutate: mutateUpdateQuantity, isSuccess } =
    useProduct().useProductUpdateQuantity();
  const [count, setCount] = useState<number>(1);
  const { open, close, isOpen } = useModal();

  useEffect(() => {
    if (isSuccess) {
      product.quantity && product.quantity > 0 ? setCount(1) : setCount(0);

      setModal({
        type: 'confirm',
        content: CART_UPDATE_SUCCESS,
        onOk: handleMove,
        onClose: close,
      });
      open();
      if (product.price) addToTotalCost(product.price * count);
    }
  }, [isSuccess]);

  const handleDecrease = () => {
    if (count >= 2) setCount(count - 1);
  };
  const handleIncrease = () => {
    if (product.quantity && count < product.quantity) setCount(count + 1);
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
    }
    if (session.status === 'authenticated' && product._id && user._id) {
      const productCountSet = {
        productId: product._id,
        count: count,
        _key: product._id,
      };
      mutateUpdateCart(
        { userId: user._id, prodCountSet: productCountSet },
        {
          onSuccess: () => {
            if (product._id && product.quantity)
              mutateUpdateQuantity({
                id: product._id,
                quantity: product.quantity - count,
              });
          },
        }
      );
    }
  };

  const handleRoute = () => {
    if (session.status === 'unauthenticated') {
      setModal({
        type: 'confirm',
        content: LOGIN_REQUEST,
        onOk: handleLogin,
        onClose: close,
      });
      open();
    }
    if (session.status === 'authenticated' && product._id && user._id) {
      setBuyList({ item: product, count: count });
      router.push(`/checkout?productId=${product._id}&count=${count}&type=buy`);
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
            <span>{product.rating ? product.rating.toFixed(1) : 0}</span>
          </div>
          <div className={styles['price-section']}>
            <div>Price: </div>
            <div className={styles.price}>
              ₩{numberWithCommas(product.price!)}
            </div>
          </div>
          {user.role !== 'ADMIN' && (
            <>
              <div className={styles['count-section']}>
                {product.quantity! <= 0 ? (
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
                  disabled={product.quantity! <= 0}
                  onClick={handleAddCart}
                />
                <Button
                  value={'Buy'}
                  className='button-long'
                  disabled={product.quantity! <= 0}
                  onClick={handleRoute}
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
