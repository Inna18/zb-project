export default {
  name: 'payment',
  title: 'Payment',
  type: 'document',
  fields: [
    { name: 'orderName', title: 'Order Name', type: 'string' },
    { name: 'apprivedAt', title: 'Approved At', type: 'string' },
    {
      name: 'receipt',
      title: 'Receipt',
      type: 'object',
      fields: [{ name: 'url', title: 'Url', type: 'string' }],
    },
    { name: 'totalAmount', title: 'Total Amount', type: 'number' },
    { name: 'method', title: 'Method', type: 'string' },
    { name: 'paymentKey', title: 'Payment Key', type: 'string' },
    { name: 'orderId', title: 'Order Id', type: 'string' },
  ],
};
