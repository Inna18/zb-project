import { useMutation } from '@tanstack/react-query';
import { updateProductImages } from '@/app/service/useProductApi';

export const useProductUpdateImages = () => {
  return useMutation({
    mutationFn: async (imagesArr: { id: string; images: File[] }) =>
      await updateProductImages(imagesArr.id, imagesArr.images),
  });
};
