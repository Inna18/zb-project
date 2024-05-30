'use client';
import styles from './templates.module.css';

import React, { useEffect } from 'react';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';
import Spinner from '../atoms/spinner/Spinner';
import CheckoutProduct from '../organisms/CheckoutProduct';

import { useUserStore } from '@/app/stores/useUserStore';
import { commonConstants } from '@/app/constants/common';
import { useSearchParams } from 'next/navigation';
import { useCartGet } from '@/app/queries/queryHooks/cart/useCartGet';
import { useUserByEmail } from '@/app/queries/queryHooks/user/useUserByEmail';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';
import { numberWithCommas } from '@/app/utils/number';
import { useDeliveryFeeStore } from '@/app/stores/useDeliveryFeeStore';

const { FIELD_EMPTY } = commonConstants;

const CheckoutTemplate = () => {
  const productId = useSearchParams()?.get('productId');
  // need user & existingUser for address & phoneNum(which aren't mandatory)
  const { user, updateUser } = useUserStore((state) => state);
  const { totalCost } = useTotalCostStore((state) => state);
  const { deliveryFee } = useDeliveryFeeStore((state) => state);
  const { data: existingUser, isLoading: loadingGetUser } = useUserByEmail(
    user.email
  );
  const { data: cart, isLoading: loadingGetCart } = useCartGet(user._id!);
  const isLoading = loadingGetCart || loadingGetUser;

  const userProperties = [
    { id: 1, value: [user.email, 'email'] },
    { id: 2, value: [user.name, 'name'] },
    { id: 3, value: [user.address, 'address'] },
    { id: 4, value: [user.phoneNumber, 'phoneNumber'] },
  ];

  useEffect(() => {
    if (existingUser) updateUser(existingUser);
  }, [existingUser]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    updateUser({ ...user, [name]: value });
  };

  const handleCheckout = () => {
    if (
      user.email !== '' &&
      user.name !== '' &&
      user.address !== '' &&
      user.address !== null &&
      user.phoneNumber !== '' &&
      user.phoneNumber !== null
    ) {
      console.log('ok');
    } else {
      console.log('error');
    }
  };

  const handleCheckDisabled = (name: string | undefined) => name === 'email';

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && user && (
        <div className={styles.container}>
          <div className={styles.title}>Checkout</div>
          <div>
            <div className={styles.subtitle}>User Info</div>
            <div className={styles['checkout-user-section']}>
              <div className={styles.titles}>
                <div>
                  Email: <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Name: <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Address: <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Phone Number:{' '}
                  <span className={styles['required-mark']}>*</span>
                </div>
              </div>
              <div className={styles.inputs}>
                {userProperties.map((property) => (
                  <div key={property.id}>
                    <Input
                      type='text'
                      changeFunc={handleInputChange}
                      hasLabel={false}
                      value={property.value[0]}
                      className='input'
                      name={property.value[1]}
                      disabled={handleCheckDisabled(property.value[1])}
                    />
                    {(property.value[0] === '' ||
                      property.value[0] === null) && (
                      <div className={styles.error}>{FIELD_EMPTY}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.subtitle}>Products</div>
            {productId && // if choose 1 item from cart to buy
              cart &&
              cart.productCountSet &&
              cart.productCountSet.length > 0 &&
              cart.productCountSet
                .filter(
                  (productCount: { productId: string; count: number }) =>
                    productCount.productId === productId
                )
                .map((productCount: { productId: string; count: number }) => (
                  <CheckoutProduct
                    key={productCount.productId}
                    productId={productCount.productId}
                    count={productCount.count}
                  />
                ))}
            {!productId && // if choose all items from cart to buy
              cart &&
              cart.productCountSet &&
              cart.productCountSet.length > 0 &&
              cart.productCountSet.map(
                (
                  productCount: { productId: string; count: number },
                  idx: number
                ) => (
                  <CheckoutProduct
                    key={productCount.productId}
                    productId={productCount.productId}
                    count={productCount.count}
                  />
                )
              )}
            {cart && // if cart is empty
              cart.productCountSet &&
              cart.productCountSet.length <= 0 && (
                <div className={styles.centered}>Cart empty</div>
              )}
          </div>
          <div>
            <div className={styles.subtitle}>Payment</div>
            <div className={styles['checkout-payment-section']}>
              <div className={styles.payment}>
                <div>Product Cost </div>
                <div>₩{numberWithCommas(totalCost)}</div>
              </div>
              <div className={styles.payment}>
                <div>Delivery Fee </div>
                <div>₩{numberWithCommas(deliveryFee)}</div>
              </div>
              <div className={styles.payment}>
                <div>Total: </div>
                <div>₩{numberWithCommas(totalCost + deliveryFee)}</div>
              </div>
            </div>
          </div>
          <div className={styles['button-section']}>
            <Button value='Checkout' onClick={handleCheckout} />
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutTemplate;
