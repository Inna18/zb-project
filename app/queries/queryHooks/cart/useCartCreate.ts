import { useMutation } from '@tanstack/react-query';
import { createCart } from '@/app/service/useCartApi';

export const useCartCreate = () => {
  return useMutation({
    mutationFn: async (
      userId: string,
      productCountSet: { productId: string; count: number }
    ) => await createCart(userId, productCountSet),
  });
};
