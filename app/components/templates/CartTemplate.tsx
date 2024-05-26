'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Button from '../atoms/button/Button';
import CartProduct from '../organisms/CartProduct';
import Spinner from '../atoms/spinner/Spinner';

import { useCartGet } from '@/app/queries/queryHooks/cart/useCartGet';
import { useUserStore } from '@/app/stores/useUserStore';
import { numberWithCommas } from '@/app/utils/number';
import { useRouter } from 'next/navigation';

const CartTemplate = () => {
  const router = useRouter();
  const { user } = useUserStore((state) => state);
  const { data: cart, isLoading: loadingCart } = useCartGet(user._id!);
  const [deliveryFee, setDeliveryFee] = useState<number>(3500);
  const [productTotal, setProductTotal] = useState<number>(0);

  const countTotalProductCost = (cost: number) => {
    setProductTotal((prevState) => prevState + cost);
  };

  useEffect(() => {
    if (productTotal === 0 || productTotal > 50000) setDeliveryFee(0);
    else setDeliveryFee(3500);
  }, [productTotal]);

  const handleBuyAll = () => {
    router.push('/checkout');
  };

  return (
    <>
      {loadingCart && <Spinner />}
      {!loadingCart && (
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
                        countTotalProductCost={countTotalProductCost}
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
                <div>₩{numberWithCommas(productTotal)}</div>
                <div className={styles.description}>total product cost</div>
              </div>
              <div>
                <div>₩{numberWithCommas(deliveryFee)}</div>
                <div className={styles.description}>
                  delivery fee (free over ₩50,000)
                </div>
              </div>
            </div>
            <div>₩{numberWithCommas(productTotal + deliveryFee)}</div>
          </div>
          <Button value='Buy All' onClick={handleBuyAll} />
        </div>
      )}
    </>
  );
};

export default CartTemplate;
