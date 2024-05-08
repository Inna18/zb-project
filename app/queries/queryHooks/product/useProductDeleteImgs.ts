import { useMutation } from '@tanstack/react-query';
import { deleteProductImages } from '@/app/service/useProductApi';

export const useProductDeleteImgs = () => {
  return useMutation({
    mutationFn: async (product: { id: string; numToDelete: number }) =>
      await deleteProductImages(product.id, product.numToDelete),
  });
};
