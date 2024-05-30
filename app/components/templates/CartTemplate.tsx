'use client';

import React from 'react';
import Image from 'next/image';
import styles from './templates.module.css';
import payIcon from '@/public/icons/money-check-dollar-solid.svg';
import removeIcon from '@/public/icons/xmark-solid.svg';
import Button from '../atoms/button/Button';

const CartTemplate = () => {
  return (
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
            <th>Delivery Fee</th>
            <th>Total</th>
            <th>Select</th>
          </tr>
          <tr className={styles.body}>
            <td>1</td>
            <td>No Image</td>
            <td>Adult</td>
            <td>32,000won</td>
            <td>2</td>
            <td>3,500</td>
            <td>64,000</td>
            <td className={styles.buttons}>
              <a onClick={()=>{}}>
                <Image src={payIcon} alt={'pay-icon'} width={20} height={20}/>
              </a>
              <a onClick={()=>{}}>
              <Image src={removeIcon} alt={'remove-icon'} width={20} height={20}/>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className={styles['cart-bottom']}>
        <div>Total: 67,500won</div>
        <Button value='Buy All' />
      </div>
    </div>
  );
};

export default CartTemplate;
