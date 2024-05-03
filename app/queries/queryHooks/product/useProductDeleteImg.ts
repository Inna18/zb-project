import { useMutation } from '@tanstack/react-query';
import { deleteProductImage } from '@/app/service/useProductApi';

export const useProductDeleteImg = () => {
  return useMutation({
    mutationFn: async (product: {id: string, imageUrl: string}) => await deleteProductImage(product.id, product.imageUrl),
  });
};
