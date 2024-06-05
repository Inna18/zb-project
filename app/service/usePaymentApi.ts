import { client } from '@/sanity/lib/client';

export default interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: { url: string };
  totalAmount: number;
  method: '카드' | '가상계좌' | '계좌이체';
  paymentKey: string;
  orderId: string;
}

async function createPayment(newPayment: Payment) {
  const sanityPayment = {
    _type: 'payment',
    orderName: newPayment.orderName,
    approvedAt: newPayment.approvedAt,
    receipt: { url: newPayment.receipt.url },
    totalAmount: newPayment.totalAmount,
    method: newPayment.method,
    paymentKey: newPayment.paymentKey,
    orderId: newPayment.orderId,
  };

  const paymentCreated = await client.create(sanityPayment);
  console.log('Payment created: ', paymentCreated);
  return paymentCreated;
}

export { createPayment };
