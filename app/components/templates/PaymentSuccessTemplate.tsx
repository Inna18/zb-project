'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Payment from '@/app/service/usePaymentApi';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePaymentCreate } from '@/app/queries/queryHooks/payment/usePayment';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';
import { useBuyListStore } from '@/app/stores/useBuyListStore';
import { useCartEmpty } from '@/app/queries/queryHooks/cart/useCartEmpty';
import { useUserStore } from '@/app/stores/useUserStore';

const PaymentSuccessTemplate = () => {
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const paymentKey = useSearchParams()?.get('paymentKey');
  const orderId = useSearchParams()?.get('orderId');
  const amount = useSearchParams()?.get('amount');
  const { data: payment, mutate: mutateSave, isPending } = usePaymentCreate();
  const { mutate: mutateCartEmpty } = useCartEmpty();
  const user = useUserStore((state) => state.user);
  const resetTotalCost = useTotalCostStore((state) => state.resetTotalCost);
  const resetBuyList = useBuyListStore((state) => state.resetBuyList);

  useEffect(() => {
    createPayment();
  }, []);

  useEffect(() => {
    if (paymentSuccess === true) {
      mutateCartEmpty(user._id!);
      resetTotalCost();
      resetBuyList();
    }
  }, [user]);

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
            <div className={styles['payment-desc']} style={{ marginTop: '50px' }}>
              <div className='p-grid-col text--left'>
                <b>결제금액: </b>
              </div>
              <div className='p-grid-col text--right' id='amount'>
                {payment.totalAmount.toLocaleString()}원
              </div>
            </div>
            <div  className={styles['payment-desc']} style={{ margin: '10px 0' }}>
              <div className='p-grid-col text--left'>
                <b>주문번호: </b>
              </div>
              <div className='p-grid-col text--right' id='orderId'>
                {payment.orderId}
              </div>
            </div>
            <div className={styles['payment-desc']} style={{ margin: '10px 0' }}>
              <div className='p-grid-col text--left'>
                <b>제품명: </b>
              </div>
              <div
                className='p-grid-col text--right'
                id='paymentKey'
                style={{ whiteSpace: 'initial', width: '250px' }}
              >
                {payment.orderName}
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
