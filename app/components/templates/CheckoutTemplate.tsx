'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Input from '../atoms/input/Input';
import Image from 'next/image';
import test from '@/public/icons/instagram.svg';
import Button from '../atoms/button/Button';

import { useUserStore } from '@/app/stores/useUserStore';
import { commonConstants } from '@/app/constants/common';
import { useSearchParams } from 'next/navigation';
import { useCartGet } from '@/app/queries/queryHooks/cart/useCartGet';

const { FIELD_EMPTY } = commonConstants;

const CheckoutTemplate = () => {
  const productId = useSearchParams()?.get('productId');
  const { user, updateUser } = useUserStore((state) => state);
  const { data: cart, isLoading: loadingGetCart } = useCartGet(user._id!);

  const userProperties = [
    { id: 1, value: [user.email, 'email'] },
    { id: 2, value: [user.name, 'name'] },
    { id: 3, value: [user.address, 'address'] },
    { id: 4, value: [user.phoneNumber, 'phoneNumber'] },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateUser({ ...user, [name]: value });
  };

  const handleCheckout = () => {
    console.log(user);
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

  return (
    <>
      {user._id && (
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
          <div>
            <div className={styles.subtitle}>Products</div>
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
