import { useMutation } from '@tanstack/react-query';
import { emptyCart } from '@/app/service/useCartApi';

export const useCartEmpty = () => {
  return useMutation({
    mutationFn: async (userId: string) => await emptyCart(userId),
  });
};
