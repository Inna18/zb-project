import { useMutation } from '@tanstack/react-query';
import Product, { createProduct } from '@/app/service/useProductApi';

export const useProductCreate = () => {
  return useMutation({
    mutationFn: async (newProduct: Product) =>
      await createProduct(newProduct),
  });
};
