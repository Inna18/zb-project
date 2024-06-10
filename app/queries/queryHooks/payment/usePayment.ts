import { useMutation } from '@tanstack/react-query';
import Payment, { createPayment } from '@/app/service/usePaymentApi';

const usePaymentCreate = () => {
  return useMutation({
    mutationFn: async (newPayment: Payment) => await createPayment(newPayment),
  });
};

export { usePaymentCreate };
