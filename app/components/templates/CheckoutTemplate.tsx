'use client';
import styles from './templates.module.css';

import React from 'react';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';

import { useUserStore } from '@/app/stores/useUserStore';
import { commonConstants } from '@/app/constants/common';
import { useSearchParams } from 'next/navigation';
import { useCartGet } from '@/app/queries/queryHooks/cart/useCartGet';
import { useUserByEmail } from '@/app/queries/queryHooks/user/useUserByEmail';
import Spinner from '../atoms/spinner/Spinner';
import CheckoutProduct from '../organisms/CheckoutProduct';

const { FIELD_EMPTY } = commonConstants;

const CheckoutTemplate = () => {
  const productId = useSearchParams()?.get('productId');
  // need user & existingUser for address & phoneNum(which aren't mandatory)
  const { user, updateUser } = useUserStore((state) => state); 
  const { data: existingUser, isLoading: loadingGetUser } = useUserByEmail(user.email); 
  const { data: cart, isLoading: loadingGetCart } = useCartGet(user._id!);
  const isLoading = loadingGetCart || loadingGetUser;
  
  const userProperties = [
    { id: 1, value: [existingUser?.email, 'email'] },
    { id: 2, value: [existingUser?.name, 'name'] },
    { id: 3, value: [existingUser?.address, 'address'] },
    { id: 4, value: [existingUser?.phoneNumber, 'phoneNumber'] },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateUser({ ...existingUser, [name]: value });
  };

  const handleCheckout = () => {
    console.log(existingUser);
    if (
      existingUser.email !== '' &&
      existingUser.name !== '' &&
      existingUser.address !== '' &&
      existingUser.address !== null &&
      existingUser.phoneNumber !== '' &&
      existingUser.phoneNumber !== null
    ) {
      console.log('ok');
    } else {
      console.log('error');
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && existingUser && (
        <div className={styles.container}>
          <div className={styles.title}>Checkout</div>
          <div>
            <div className={styles.subtitle}>User Info</div>
            <div className={styles['checkout-user-section']}>
              <div className={styles.titles}>
                <div>
                  Name: <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Email: <span className={styles['required-mark']}>*</span>
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
          <div className={styles.subtitle}>Products</div>
          {cart &&
          cart.productCountSet &&
          cart.productCountSet.length > 0 ? (
            cart.productCountSet.map(
              (
                productCount: { productId: string; count: number },
                idx: number
              ) => (
                <CheckoutProduct
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
          {/* <div>
            <div className={styles['checkout-product-section']}>
              <div className={styles.product}>
                <Image src={test} alt={''} width={100} height={100} />
                <div>
                  <div>Product Name</div>
                  <div>Quantity</div>
                  <div>Totdal Cost</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.subtitle}>Payment</div>
            <div className={styles['checkout-payment-section']}>
              <div className={styles.payment}>
                <div>Product Cost </div>
                <div>47,000won</div>
              </div>
              <div className={styles.payment}>
                <div>Delivery Fee </div>
                <div>3,500won</div>
              </div>
              <div className={styles.payment}>
                <div>Total: </div>
                <div>50,500won</div>
              </div>
            </div>
          </div> */}
          <div className={styles['button-section']}>
            <Button value='Checkout' onClick={handleCheckout} />
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutTemplate;
