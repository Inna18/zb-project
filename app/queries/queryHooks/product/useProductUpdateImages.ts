import { useMutation } from '@tanstack/react-query';
import Product, { updateProductImages } from '@/app/service/useProductApi';

export const useProductUpdateImages = () => {
  return useMutation({
    mutationFn: async (id: string | undefined, image: File) =>
      await updateProductImages(id, image),
  });
};
