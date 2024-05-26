import { useMutation } from '@tanstack/react-query';
import { removeFromCart } from '@/app/service/useCartApi';

export const useCartDelete = () => {
  return useMutation({
    mutationFn: async (obj: { userId: string; productId: string }) =>
      await removeFromCart(obj.userId, obj.productId),
  });
};
