import { useMutation, useQueryClient } from '@tanstack/react-query';
import Product, { updateProductStatus } from '@/app/service/useProductApi';
import { PRODUCT_KEYS } from '../../queryKeys';

export const useProductUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (obj: { id: string; posted: boolean }) =>
      await updateProductStatus(obj.id, obj.posted),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PRODUCT_KEYS.list() });
    },
  });
};
