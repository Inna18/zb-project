import styles from './organisms.module.css';

import React from 'react';
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
import { useRouter } from 'next/navigation';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';

interface CartProductProps {
  productId: string;
  count: number;
  idx: number;
}

const CartProduct = (cartProductProps: CartProductProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const substructFromTotalCost = useTotalCostStore(
    (state) => state.substructFromTotalCost
  );
  const { productId, count, idx } = cartProductProps;
  const { data: product, isLoading } = useProductGetById(productId);
  const { mutate: mutateCartDelete, isPending: pendingCartDelete } =
    useCartDelete();
  const { mutate: mutateQuantityUpdate, isPending: pendingQuantityUpdate } =
    useProductUpdateQuantity();

  const isLoadingOrPending =
    isLoading || pendingCartDelete || pendingQuantityUpdate;

  const handleDelete = () => {
    if (user._id) {
      mutateCartDelete(
        {
          userId: user._id ?? user._id,
          productId: productId,
        },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(
              ['cart', { userId: user._id }],
              () => data
            );
            mutateQuantityUpdate(
              // add to product quantity again
              { id: productId, quantity: product.quantity + count }
            );
            substructFromTotalCost(product.price);
          },
        }
      );
    }
  };

  const handleBuy = () => {
    if (user._id) {
      router.push(`/checkout?productId=${productId}`);
    }
  };

  return (
    <>
      {isLoadingOrPending && <Spinner />}
      {!isLoading && (
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
              <a onClick={handleBuy}>
                <Image src={payIcon} alt={'pay-icon'} width={20} height={20} />
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
