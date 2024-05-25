import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import payIcon from '@/public/icons/money-check-dollar-solid.svg';
import removeIcon from '@/public/icons/xmark-solid.svg';
import Spinner from '../atoms/spinner/Spinner';

import { useProductGetById } from '@/app/queries/queryHooks/product/useProductGetById';
import { numberWithCommas } from '@/app/utils/number';
import { useCartDelete } from '@/app/queries/queryHooks/cart/useCartDelete';
import { useUserStore } from '@/app/stores/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { useProductUpdateQuantity } from '@/app/queries/queryHooks/product/useProductUpdateQuantity';

interface CartProductProps {
  productId: string;
  count: number;
  idx: number;
  countTotalProductCost: (total: number) => void;
}

const CartProduct = (cartProductProps: CartProductProps) => {
  const queryClient = useQueryClient();
  const { user } = useUserStore((state) => state);
  const { productId, count, idx, countTotalProductCost } = cartProductProps;
  const { data: product, isLoading: loadingProduct } =
    useProductGetById(productId);
  const { mutate: mutateDelete, isPending: pendingDelete } = useCartDelete();
  const { mutate: mutateUpdate, isPending: pendingUpdate } = useProductUpdateQuantity();

  useEffect(() => {
    if (product) countTotalProductCost(product.price * count);
  }, [product]);

  const handleDelete = () => {
    if (user._id) {
      mutateDelete({
        userId: user._id ?? user._id,
        productId: productId
      }, {
        onSuccess: (data) => {
          queryClient.setQueryData(['cart', { userId: user._id }], () => data );
          mutateUpdate( // add to product quantity again
            { id: productId, quantity: product.quantity + count }
          )
        }
      });
    }
  }

  return (
    <>
      {(loadingProduct || pendingDelete) && <Spinner />}
      {!loadingProduct && (
        <tr className={styles.body}>
          <td>{idx}</td>
          <td>
            {product.productImages ? (
              <Image
                src={product.productImages[0]}
                alt={''}
                width={70}
                height={70}
              />
            ) : (
              <div>No Image</div>
            )}
          </td>
          <td>{product.name}</td>
          <td>₩{numberWithCommas(product.price)}</td>
          <td>{count}</td>
          <td>₩{numberWithCommas(product.price * count)}</td>
          <td>
            <div className={styles.buttons}>
              <a onClick={() => {}}>
                <Image src={payIcon} 
                alt={'pay-icon'} 
                width={20}
                 height={20} />
              </a>
              <a onClick={handleDelete}>
                <Image
                  src={removeIcon}
                  alt={'remove-icon'}
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default CartProduct;
