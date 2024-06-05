'use client';
import styles from './templates.module.css';

import React, { useEffect, useRef, useState } from 'react';
import Button from '../atoms/button/Button';

import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import { useQuery } from '@tanstack/react-query';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';
import { useDeliveryFeeStore } from '@/app/stores/useDeliveryFeeStore';

function usePaymentWidget(clientKey: string, customerKey: string) {
  return useQuery({
    queryKey: ['payment-widget', clientKey, customerKey],
    queryFn: () => {
      // ------  결제위젯 초기화 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}

const PaymentTemplate = () => {
  const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
  const customerKey = 'vyaf184qyL_sIZ6u8IM2w';

  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
  // const { data: paymentWidget } = usePaymentWidget(clientKey, ANONYMOUS); // 비회원 결제
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);
  const agreementsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderAgreement']
  > | null>(null);
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] =
    useState(false);
  const totalCost = useTotalCostStore((state) => state.totalCost);
  const deliveryFee = useDeliveryFeeStore((state) => state.deliveryFee);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // ------  결제위젯 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: totalCost + deliveryFee },
      { variantKey: 'DEFAULT' }
    );

    // ------  이용약관 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement('#agreement', {
      variantKey: 'AGREEMENT',
    });

    //  ------  결제 UI 렌더링 완료 이벤트 ------
    paymentMethodsWidget.on('ready', () => {
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      isPaymentMethodsWidgetReady(true);
    });
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(totalCost + deliveryFee);
  }, [totalCost]);

  return (
    <main>
      <div className='wrapper'>
        <div className='box_section'>
          <div id='payment-widget' style={{ width: '100%' }} />
          <div id='agreement' style={{ width: '100%' }} />
          <div className={styles.centered}>
            <Button
              value={'Checkout'}
              className='button'
              style={{ marginTop: '30px' }}
              disabled={!paymentMethodsWidgetReady}
              onClick={async () => {
                try {
                  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                  // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
                  await paymentWidget?.requestPayment({
                    orderId: nanoid(),
                    orderName: '토스 티셔츠 외 2건',
                    customerName: '김토스',
                    customerEmail: 'customer123@gmail.com',
                    customerMobilePhone: '01012341234',
                    successUrl: `${window.location.origin}/payment/success`,
                    failUrl: `${window.location.origin}/payment/fail`,
                  });
                } catch (error) {
                  // 에러 처리하기
                  console.error(error);
                }
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentTemplate;
