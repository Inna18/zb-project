import { useMutation } from '@tanstack/react-query';
import Product, { updateProduct } from '@/app/service/useProductApi';

export const useProductUpdate = () => {
  return useMutation({
    mutationFn: async (product: Product) => await updateProduct(product._id!, product),
  });
};
