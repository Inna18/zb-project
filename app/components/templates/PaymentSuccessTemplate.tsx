'use client';
import React, { useEffect } from 'react';
import Payment from '@/app/service/usePaymentApi';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePaymentCreate } from '@/app/queries/queryHooks/payment/usePayment';

const PaymentSuccessTemplate = () => {
  const router = useRouter();
  const paymentKey = useSearchParams()?.get('paymentKey');
  const orderId = useSearchParams()?.get('orderId');
  const amount = useSearchParams()?.get('amount');
  const { data: payment, mutate: mutateSave, isPending } = usePaymentCreate();

  useEffect(() => {
    createPayment();
  }, []);

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
      console.log(payment);
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
        <main>
          <div className='box_section' style={{ width: '600px' }}>
            <img
              width='100px'
              src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png'
            />
            <h2>결제를 완료했어요</h2>
            <div className='p-grid typography--p' style={{ marginTop: '50px' }}>
              <div className='p-grid-col text--left'>
                <b>결제금액</b>
              </div>
              <div className='p-grid-col text--right' id='amount'>
                {payment.totalAmount.toLocaleString()}원
              </div>
            </div>
            <div className='p-grid typography--p' style={{ marginTop: '10px' }}>
              <div className='p-grid-col text--left'>
                <b>주문번호</b>
              </div>
              <div className='p-grid-col text--right' id='orderId'>
                {payment.orderId}
              </div>
            </div>
            <div className='p-grid typography--p' style={{ marginTop: '10px' }}>
              <div className='p-grid-col text--left'>
                <b>paymentKey</b>
              </div>
              <div
                className='p-grid-col text--right'
                id='paymentKey'
                style={{ whiteSpace: 'initial', width: '250px' }}
              >
                {payment.paymentKey}
              </div>
            </div>
            <div className='p-grid-col'>
              <Link href='https://docs.tosspayments.com/guides/payment-widget/integration'>
                <button className='button p-grid-col5'>연동 문서</button>
              </Link>
              <Link href='https://discord.gg/A4fRFXQhRu'>
                <button
                  className='button p-grid-col5'
                  style={{ backgroundColor: '#e8f3ff', color: '#1b64da' }}
                >
                  실시간 문의
                </button>
              </Link>
            </div>
          </div>
          <div
            className='box_section'
            style={{ width: '600px', textAlign: 'left' }}
          >
            <b>Response Data :</b>
            <div id='response' style={{ whiteSpace: 'initial' }}>
              {payment && <pre>{JSON.stringify(payment, null, 4)}</pre>}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default PaymentSuccessTemplate;
