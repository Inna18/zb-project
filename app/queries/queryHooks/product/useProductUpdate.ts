import { useMutation } from '@tanstack/react-query';
import Product, { updateProduct } from '@/app/service/useProductApi';

export const useProductUpdate = () => {
  return useMutation({
    mutationFn: async (obj: { id: string; product: Product }) =>
      await updateProduct(obj.id, obj.product),
  });
};
