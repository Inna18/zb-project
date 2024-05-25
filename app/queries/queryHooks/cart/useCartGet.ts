import { useQuery } from '@tanstack/react-query';
import { CART_KEYS } from '@/app/queries/queryKeys';
import { getCartByUserId } from '@/app/service/useCartApi';

export const useCartGet = (userId: string) => {
  return useQuery({
    queryKey: CART_KEYS.get(userId),
    queryFn: async () => await getCartByUserId(userId),
  });
};
