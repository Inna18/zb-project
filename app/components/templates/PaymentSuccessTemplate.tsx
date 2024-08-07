'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Payment from '@/app/service/usePaymentApi';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePaymentCreate } from '@/app/queries/queryHooks/payment/usePayment';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';
import { useBuyListStore } from '@/app/stores/useBuyListStore';
import { useCart } from '@/app/queries/queryHooks/cart/useCart';
import { useOrder } from '@/app/queries/queryHooks/order/useOrder';
import { useUserStore } from '@/app/stores/useUserStore';

const PaymentSuccessTemplate = () => {
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const paymentKey = useSearchParams()?.get('paymentKey');
  const orderId = useSearchParams()?.get('orderId');
  const amount = useSearchParams()?.get('amount');
  const { data: payment, mutate: mutateSave, isPending } = usePaymentCreate();
  const { mutate: mutateCartEmpty } = useCart().useCartEmpty();
  const { mutate: mutateOrderCreate } = useOrder().useOrderCreate();
  const user = useUserStore((state) => state.user);
  const { totalCost, resetTotalCost } = useTotalCostStore((state) => state);
  const { buyList, resetBuyList } = useBuyListStore((state) => state);

  useEffect(() => {
    createPayment();
  }, []);

  useEffect(() => {
    if (paymentSuccess === true) {
      mutateCartEmpty(user._id!);
      mutateOrderCreate({
        userId: user._id!,
        itemSet: buyList.map((itemSet) => {
          return {
            _key: itemSet.item._id!,
            image: itemSet.item.productImages![0],
            name: itemSet.item.name!,
            price: itemSet.item.price!,
            count: itemSet.count!,
          };
        }),
        totalCost: buyList.reduce(
          (acc, curVal) => acc + curVal.item.price! * curVal.count,
          0
        ),
      });
      resetTotalCost();
      resetBuyList();
    }
  }, [user, paymentSuccess]);

  const createPayment = async () => {
    try {
      // ------  결제 승인 ------
      // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
      const { data: payment } = await axios.post<Payment>(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          paymentKey,
          orderId,
          amount,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6:`).toString('base64')}`,
          },
        }
      );
      setPaymentSuccess(true);
      mutateSave(payment);
    } catch (err: any) {
      console.error('err', err.response.data);
      router.push(
        `/payment/fail?code=${err.response.data.code}&message=${encodeURIComponent(err.response.data.message)}`
      );
    }
  };

  return (
    <>
      {payment && (
        <>
          <main>
            <div className={styles.container}>
              <img
                width='100px'
                src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png'
              />
              <h2>결제를 완료했어요</h2>
              <div className={styles['payment-section']}>
                <div
                  className={styles['payment-desc']}
                  style={{ marginTop: '50px' }}
                >
                  <div className='p-grid-col text--left'>
                    <b>결제금액: </b>
                  </div>
                  <div className='p-grid-col text--right' id='amount'>
                    {payment.totalAmount.toLocaleString()}원
                  </div>
                </div>
                <div
                  className={styles['payment-desc']}
                  style={{ margin: '10px 0' }}
                >
                  <div className='p-grid-col text--left'>
                    <b>주문번호: </b>
                  </div>
                  <div className='p-grid-col text--right' id='orderId'>
                    {payment.orderId}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default PaymentSuccessTemplate;
