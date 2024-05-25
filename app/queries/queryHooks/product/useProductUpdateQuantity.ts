import { useMutation } from '@tanstack/react-query';
import { updateProductQuantity } from '@/app/service/useProductApi';

export const useProductUpdateQuantity = () => {
  return useMutation({
    mutationFn: async (obj: { id: string; quantity: number }) =>
      await updateProductQuantity(obj.id, obj.quantity),
  });
};
