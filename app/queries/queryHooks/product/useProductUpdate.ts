import { useMutation, useQueryClient } from '@tanstack/react-query';
import Product, { updateProduct } from '@/app/service/useProductApi';
import { PRODUCT_KEYS } from '../../queryKeys';

export const useProductUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (obj: { id: string; product: Product }) =>
      await updateProduct(obj.id, obj.product),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PRODUCT_KEYS.list() });
    },
  });
};
