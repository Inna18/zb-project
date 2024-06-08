'use client';
import styles from './templates.module.css';

import React, { useEffect } from 'react';
import Button from '../atoms/button/Button';
import CartProduct from '../organisms/CartProduct';
import Spinner from '../atoms/spinner/Spinner';

import { useCart } from '@/app/queries/queryHooks/cart/useCart';
import { useUserStore } from '@/app/stores/useUserStore';
import { useDeliveryFeeStore } from '@/app/stores/useDeliveryFeeStore';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';
import { numberWithCommas } from '@/app/utils/number';
import { useRouter } from 'next/navigation';

const CartTemplate = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { totalCost, addToTotalCost } = useTotalCostStore((state) => state);
  const { deliveryFee, setDeliveryFee } = useDeliveryFeeStore((state) => state);
  const { data: cart, isLoading } = useCart().useCartGet(user._id!);

  useEffect(() => {
    if (cart && totalCost === 0) {
      addToTotalCost(cart.productTotalCost);
    }
    if (totalCost === 0 || totalCost > 50000) setDeliveryFee(0);
    else setDeliveryFee(3500);
  }, [totalCost, cart]);

  const handleBuyAll = () => {
    router.push('/checkout');
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles.container}>
          <div className={styles.title}>Cart</div>
          <div>
            <table className={styles['cart-table']} cellSpacing='0'>
              <tbody>
                <tr className={styles.header}>
                  <th>NO</th>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Select</th>
                </tr>
                {cart &&
                cart.productCountSet &&
                cart.productCountSet.length > 0 ? (
                  cart.productCountSet.map(
                    (
                      productCount: { productId: string; count: number },
                      idx: number
                    ) => (
                      <CartProduct
                        key={productCount.productId}
                        productId={productCount.productId}
                        count={productCount.count}
                        idx={idx + 1}
                      />
                    )
                  )
                ) : (
                  <div className={styles.centered}>Cart empty</div>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles['cart-bottom']}>
            <div>Total: </div>
            <div className={styles.cost}>
              <div>
                <div>₩{numberWithCommas(totalCost)}</div>
                <div className={styles.description}>total product cost</div>
              </div>
              <div>
                <div>₩{numberWithCommas(deliveryFee)}</div>
                <div className={styles.description}>
                  delivery fee (free over ₩50,000)
                </div>
              </div>
            </div>
            <div>₩{numberWithCommas(totalCost + deliveryFee)}</div>
          </div>
          <Button value='Buy All' onClick={handleBuyAll} />
        </div>
      )}
    </>
  );
};

export default CartTemplate;
