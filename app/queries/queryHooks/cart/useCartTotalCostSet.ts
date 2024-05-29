import { useMutation } from '@tanstack/react-query';
import { setCartTotalCost } from '@/app/service/useCartApi';

export const useCartTotalCostSet = () => {
  return useMutation({
    mutationFn: async (obj: {
      userId: string;
      productTotalCost: number;
    }) => await setCartTotalCost(obj.userId, obj.productTotalCost),
  });
};
