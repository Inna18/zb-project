import { useMutation, useQueryClient } from '@tanstack/react-query';
import Product, { updateProductRating } from '@/app/service/useProductApi';
import { PRODUCT_KEYS } from '../../queryKeys';

export const useProductUpdateRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (obj: { id: string; rating: number }) =>
      await updateProductRating(obj.id, obj.rating),
    onSuccess: (data) => {
      queryClient.setQueryData(PRODUCT_KEYS.get(data._id), (old: Product) => ({
        ...old,
        rating: data.rating,
      }));
    },
  });
};
