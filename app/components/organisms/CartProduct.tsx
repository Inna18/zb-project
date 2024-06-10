import styles from './organisms.module.css';

import React, { useEffect } from 'react';
import Image from 'next/image';
import payIcon from '@/public/icons/money-check-dollar-solid.svg';
import removeIcon from '@/public/icons/xmark-solid.svg';
import Spinner from '../atoms/spinner/Spinner';

import { useProduct } from '@/app/queries/queryHooks/product/useProduct';
import { numberWithCommas } from '@/app/utils/number';
import { useCart } from '@/app/queries/queryHooks/cart/useCart';
import { useUserStore } from '@/app/stores/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';
import { useBuyListStore } from '@/app/stores/useBuyListStore';
import { CART_KEYS } from '@/app/queries/queryKeys';

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
  const { buyList, setBuyList, addToBuyList, removeFromBuyList } = useBuyListStore(
    (state) => state
  );
  const { productId, count, idx } = cartProductProps;
  const { data: product, isLoading } =
    useProduct().useProductGetById(productId);
  const { mutate: mutateCartDelete, isPending: pendingCartDelete } =
    useCart().useCartDelete();
  const { mutate: mutateQuantityUpdate, isPending: pendingQuantityUpdate } =
    useProduct().useProductUpdateQuantity();
  const isLoadingOrPending =
    isLoading || pendingCartDelete || pendingQuantityUpdate;

  useEffect(() => {
    if (product) {
      if (buyList.filter(itemSet => itemSet.item._id === product._id).length <= 0) addToBuyList({ item: product, count: count });
      if (buyList.filter(itemSet => itemSet.item._id === product._id).length > 0) {
        removeFromBuyList(product);
        addToBuyList({ item: product, count: count })
      }
    }
  }, [product, count]);

  const handleDelete = () => {
    if (user._id) {
      mutateCartDelete(
        {
          userId: user._id ?? user._id,
          productId: productId,
        },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(CART_KEYS.get(user._id!), () => data);
            mutateQuantityUpdate(
              // add to product quantity again
              { id: productId, quantity: product.quantity + count }
            );
            substructFromTotalCost(product.price * count);
            removeFromBuyList(product);
          },
        }
      );
    }
  };

  const handleRoute = () => {
    if (user._id) {
      setBuyList({ item: product, count: count });
      router.push(`/checkout?productId=${productId}&count=${count}&type=cart`);
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
                style={{objectFit: 'cover'}}
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
              <a onClick={handleRoute}>
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
