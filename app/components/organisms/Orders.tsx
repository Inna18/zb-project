import styles from './organisms.module.css';

import React from 'react';
import Image from 'next/image';
import Spinner from '../atoms/spinner/Spinner';
import Order from '@/app/service/useOrderApi';
import moment from 'moment';
import { useOrder } from '@/app/queries/queryHooks/order/useOrder';
import { useUserStore } from '@/app/stores/useUserStore';
import { numberWithCommas } from '@/app/utils/number';

const Orders = () => {
  const user = useUserStore((state) => state.user);
  const { data: orderList, isLoading } = useOrder().useOrderList(user._id!);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {orderList.map((order: Order) => (
            <div key={order._id} className={styles['order-card']}>
              <div>{moment(order._createdAt).format('YYYY-MM-DD, HH:mm')}</div>
              {order.itemSet.map(
                (item: {
                  _key: string;
                  image: string;
                  name: string;
                  price: number;
                  count: number;
                }) => (
                  <>
                    <div className={styles['order-content']}>
                      <Image
                        src={item.image}
                        alt={'order-image'}
                        width={75}
                        height={75}
                        style={{ objectFit: 'cover' }}
                      />
                      <div>
                        <div>Name: {item.name}</div>
                        <div>Price: {item.price}</div>
                        <div>Count: {item.count}</div>
                      </div>
                    </div>
                  </>
                )
              )}
              <div className={styles.total}>
                Total: ₩{numberWithCommas(order.totalCost)}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Orders;
