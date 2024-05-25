import { useMutation } from '@tanstack/react-query';
import { addToCart } from '@/app/service/useCartApi';

export const useCartUpdate = () => {
  return useMutation({
    mutationFn: async (obj: {
      userId: string;
      prodCountSet: { productId: string; count: number };
    }) => await addToCart(obj.userId, obj.prodCountSet),
  });
};
