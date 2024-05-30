import { useMutation } from '@tanstack/react-query';
import { updateProductRating } from '@/app/service/useProductApi';

export const useProductUpdateRating = () => {
  return useMutation({
    mutationFn: async (obj: { id: string; rating: number }) =>
      await updateProductRating(obj.id, obj.rating),
  });
};
